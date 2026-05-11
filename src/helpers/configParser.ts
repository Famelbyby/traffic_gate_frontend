/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Configuration } from '~/types/configuration';

export type ReservedWord =
	| 'listener'
	| 'address'
	| 'max_connections'
	| 'idle_timeout_ms'
	| 'read_timeout_ms'
	| 'write_timeout_ms'
	| 'admin'
	| 'enabled'
	| 'logging'
	| 'level'
	| 'access_log_enabled'
	| 'metrics'
	| 'upstreams'
	| 'routes'
	| 'upstream_name'
	| 'path_prefix'
	| 'strategy'
	| 'connect_timeout_ms'
	| 'request_timeout_ms'
	| 'health_check'
	| 'kind'
	| 'path'
	| 'interval_ms'
	| 'timeout_ms'
	| 'healthy_threshold'
	| 'unhealhty_threshold'
	| 'backends'
	| 'weight';

export function checkReservedWord(
	parent: ReservedWord | undefined,
	depth: number,
	data: ReservedWord | string,
) {
	switch (data) {
		case 'metrics':
		case 'upstreams':
		case 'routes':
		case 'logging':
		case 'admin':
		case 'listener':
			if (depth !== 0) {
				return false;
			}

			break;
		case 'strategy':
		case 'connect_timeout_ms':
		case 'request_timeout_ms':
		case 'health_check':
			if (depth !== 2) {
				return false;
			}

			break;
		case 'address':
			if (parent !== 'listener' && parent !== 'admin' && depth !== 4) {
				return false;
			}

			break;
		case 'max_connections':
		case 'idle_timeout_ms':
		case 'read_timeout_ms':
		case 'write_timeout_ms':
			if (parent !== 'listener') {
				return false;
			}

			break;
		case 'enabled':
			if (
				parent !== 'admin' &&
				parent !== 'metrics' &&
				parent !== 'health_check'
			) {
				return false;
			}

			break;
		case 'level':
		case 'access_log_enabled':
			if (parent !== 'logging') {
				return false;
			}

			break;
		case 'upstream_name':
		case 'path_prefix':
			if (depth !== 2) {
				return false;
			}

			break;
		case 'kind':
		case 'path':
		case 'interval_ms':
		case 'timeout_ms':
		case 'healthy_threshold':
		case 'unhealhty_threshold':
			if (parent !== 'health_check') {
				return false;
			}

			break;
		default:
			if (
				parent !== 'upstreams' &&
				parent !== 'backends' &&
				parent !== 'routes'
			) {
				return false;
			}
	}

	return true;
}

export function checkFieldType(
	key: ReservedWord,
	valueType: string | undefined,
) {
	switch (key) {
		case 'logging':
		case 'listener':
		case 'admin':
		case 'metrics':
		case 'upstreams':
		case 'routes':
		case 'backends':
		case 'health_check':
			if (valueType !== undefined) {
				return false;
			}

			break;
		case 'enabled':
		case 'access_log_enabled':
			if (valueType !== 'true' && valueType !== 'false') {
				return false;
			}

			break;
		case 'level':
		case 'strategy':
		case 'kind':
			return true;
		case 'max_connections':
		case 'idle_timeout_ms':
		case 'read_timeout_ms':
		case 'write_timeout_ms':
		case 'connect_timeout_ms':
		case 'request_timeout_ms':
		case 'interval_ms':
		case 'timeout_ms':
		case 'healthy_threshold':
		case 'unhealhty_threshold':
		case 'weight':
			if (valueType === undefined) {
				return false;
			}

			if (isNaN(+valueType)) {
				return false;
			}

			break;
	}

	return true;
}

type State = 0 | 1 | 2;

function makeSyntaxError(
	stringIndex: number,
	columnIndex: number,
	expectedChar?: string,
) {
	return new Error(
		`Syntax error at string ${stringIndex}, column ${columnIndex}${expectedChar ? ', expected: ' + expectedChar : ''}`,
	);
}

export function parseConfiguration(data: Configuration): object | Error {
	//Нужно для конфига
	const config: Record<string, any> = {};
	const parentsChain: string[] = [];
	let parent: string | undefined = undefined;

	//Нужно для состояний автомата
	let state: State = 0;
	let depth = 0;

	//Нужно для создания пар ключ-значение
	let key = '';
	let value = '';

	//Нужно для отображения ошибок
	let stringIndex = 1;
	let columnIndex = 0;

	let currentContext: Record<string, any> | undefined;

	for (let i = 0; i < data.length; ++i) {
		++columnIndex;

		switch (data[i]) {
			case ' ':
			case '\t':
				continue;
			case '\n':
				++stringIndex;
				columnIndex = 0;

				continue;
			case '}':
				if (state === 2) {
					return makeSyntaxError(stringIndex, columnIndex, ',');
				}

				if (key !== '') {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				if (depth === 0) {
					return new Error('Bad key');
				}

				--depth;

				if (state === 1 && depth === 0) {
					state = 0;
				}

				parentsChain.pop();
				parent = parentsChain.at(-1);
				currentContext = config;

				parentsChain.forEach((par) => {
					currentContext = currentContext?.[par];
				});

				break;
			case '{':
				if (state === 2) {
					return makeSyntaxError(stringIndex, columnIndex, ',');
				}

				if (!checkReservedWord(<ReservedWord>parent, depth, key)) {
					return new Error('Bad key');
				}

				parent = key;
				++depth;

				if (state === 0) {
					state = 1;
				}

				(currentContext ?? config)[key] = {};
				currentContext = (currentContext ?? config)[key];
				parentsChain.push(key);
				parent = key;
				key = '';

				break;
			case ':':
				if (
					!checkReservedWord(
						<ReservedWord>parent,
						depth,
						<ReservedWord>key,
					)
				) {
					return new Error('Bad key');
				}

				if (state !== 1) {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				state = 2;
				break;
			case ',':
				if (state !== 2) {
					return makeSyntaxError(stringIndex, columnIndex, ':');
				}

				if (value === '') {
					return new Error(
						`Value cannot be empty, string ${stringIndex}, column ${columnIndex}`,
					);
				}

				if (!checkFieldType(<ReservedWord>key, value)) {
					return new Error('Bad value type');
				}

				if (currentContext === undefined) {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				currentContext[key] = value;
				value = '';
				key = '';
				state = 1;

				break;
			default:
				if (state === 2) {
					value += data[i];
				} else {
					key += data[i];
				}
		}
	}

	if (depth !== 0) {
		return makeSyntaxError(stringIndex, columnIndex, '}');
	}

	if (key !== '') {
		return makeSyntaxError(stringIndex, columnIndex);
	}

	return config;
}
