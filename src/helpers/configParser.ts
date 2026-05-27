/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	Configuration,
	ConfigurationSettings,
} from '~/types/configuration';

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
		case 'weight':
			if (depth !== 4) {
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
		case 'backends':
			if (depth !== 2) {
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

type State = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function makeSyntaxError(
	stringIndex: number,
	columnIndex: number,
	expectedChar?: string,
) {
	return new Error(
		`Syntax error at string ${stringIndex}, column ${columnIndex}${expectedChar ? ', expected: ' + expectedChar : ''}`,
	);
}

function makeBadKeyError(stringIndex: number, columnIndex: number) {
	return new Error(`Bad key at string ${stringIndex}, column ${columnIndex}`);
}

function makeTabError(
	currentCount: number,
	expectedCount: number,
	stringIndex: number,
	columnIndex: number,
) {
	if (currentCount < expectedCount) {
		return makeSyntaxError(
			stringIndex,
			columnIndex,
			'\\t'.repeat(expectedCount - currentCount),
		);
	}

	return new Error(`Unexpected ${currentCount - expectedCount} tab`);
}

export function parseConfiguration(
	data: Configuration,
	settings: ConfigurationSettings,
): object | Error {
	//Нужно для конфига
	const config: Record<string, any> = {};
	const parentsChain: string[] = [];
	let parent: string | undefined = undefined;

	//Нужно для состояний автомата
	let state: State = 0;
	let depth = 0;
	let tabCount = 0;

	//Нужно для создания пар ключ-значение
	let key = '';
	let value = '';

	//Нужно для отображения ошибок
	let stringIndex = 1;
	let columnIndex = 0;

	let currentContext: Record<string, any> | undefined;

	for (let i = 0; i < data.length; ++i) {
		++columnIndex;

		if (data[i] === "\"") {
			if (![3, 6].includes(state)) {
				return makeSyntaxError(stringIndex, columnIndex, `${settings.divisionSymbol}`);
			}

			if (state === 3) {
				state = 6;
			} else {
				state = 3;
			}
		}

		if (data[i] === '\n') {
			if (![0, 1, 4, 5].includes(state)) {
				return makeSyntaxError(stringIndex, columnIndex);
			}

			++stringIndex;
			columnIndex = 0;
			tabCount = 0;
			
			if (state === 4) {
				state = 1;
			}

			if (state === 5) {
				if (depth === 0) {
					state = 0;
				} else {
					state = 1;
				}
			}

			continue;
		}

		if (data[i] === '\t') {
			if (state !== 1) {
				return makeSyntaxError(stringIndex, columnIndex);
			}

			++tabCount;

			if (
				settings.indent !== 'Нет' &&
				tabCount !== depth * +settings.indent
			) {
				return makeTabError(
					tabCount,
					depth * +settings.indent,
					stringIndex,
					columnIndex,
				);
			}

			continue;
		}

		if (state === 6) {
			value += data[i];

			continue;
		}

		switch (data[i]) {
			case ' ':
				continue;
			case settings.postComplexSymbol:
				if (state !== 1) {
					return makeSyntaxError(
						stringIndex,
						columnIndex,
						String(settings.postSymbol),
					);
				}

				if (key !== '') {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				--depth;

				state = 5;

				parentsChain.pop();
				parent = parentsChain.at(-1);
				currentContext = config;

				parentsChain.forEach((par) => {
					currentContext = currentContext?.[par];
				});

				break;
			case settings.preComplexSymbol:
				if (![0, 2].includes(state)) {
					return makeSyntaxError(stringIndex, columnIndex, String(settings.postSymbol));
				}

				if (!checkReservedWord(<ReservedWord>parent, depth, key)) {
					return makeBadKeyError(stringIndex, columnIndex);
				}

				parent = key;
				++depth;

				(currentContext ?? config)[key] = {};
				currentContext = (currentContext ?? config)[key];
				parentsChain.push(key);
				parent = key;
				key = '';
				state = 4;

				break;
			case settings.preSymbol:
				if (state !== 1) {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				if (
					settings.indent !== 'Нет' &&
					tabCount !== depth * +settings.indent
				) {
					return makeTabError(
						tabCount,
						depth * +settings.indent,
						stringIndex,
						columnIndex,
					);
				}

				state = 2;

				break;
			case settings.divisionSymbol:
				if (state !== 2) {
					return makeSyntaxError(stringIndex, columnIndex, `${settings.preSymbol}`);
				}

				if (
					!checkReservedWord(
						<ReservedWord>parent,
						depth,
						<ReservedWord>key,
					)
				) {
					return makeBadKeyError(stringIndex, columnIndex);
				}

				state = 3;
				break;
			case settings.postSymbol:
				if (state !== 3) {
					return makeSyntaxError(stringIndex, columnIndex, String(settings.divisionSymbol));
				}

				if (value === '') {
					return new Error(
						`Value cannot be empty at string ${stringIndex}, column ${columnIndex}`,
					);
				}

				if (!checkFieldType(<ReservedWord>key, value)) {
					return new Error(
						`Bad value type at string ${stringIndex}, column ${columnIndex}`,
					);
				}

				if (currentContext === undefined) {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				currentContext[key] = value;
				value = '';
				key = '';
				state = 5;

				break;
			default:
				if ('!,:;&%$()[]{}#-'.includes(data[i])) {
					return makeSyntaxError(stringIndex, columnIndex);
				}

				if (state === 1 && settings.preSymbol === 'Нет') {
					state = 2;
				}

				if (state === 2 || state === 0) {
					key += data[i];
				} else {
					value += data[i];
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
