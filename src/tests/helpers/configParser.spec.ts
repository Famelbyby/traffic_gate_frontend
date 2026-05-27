import { parseConfiguration } from '~/helpers/configParser';

describe('configuration parser testing', () => {
	test('with key error', () => {
		const config = 'gogo {}';

		expect(parseConfiguration(config)).toBeInstanceOf(Error);
	});

	test('with state 2 error', () => {
		const config = 'admin{enabled:,}';

		expect(parseConfiguration(config)).toBeInstanceOf(Error);
	});

	test('with semicolon error', () => {
		const config = 'admin{enabled:ahah}';

		expect(parseConfiguration(config)).toBeInstanceOf(Error);
	});

	test('with value field error', () => {
		const config = 'admin{enabled: 2,}';

		expect(parseConfiguration(config)).toBeInstanceOf(Error);
	});

	test('with key of depth 1+ error', () => {
		const config = 'admin{ahah: true,}';

		expect(parseConfiguration(config)).toBeInstanceOf(Error);
	});
});

describe('successful result', () => {
	test('returned object', () => {
		const config =
			'listener{address:"",max_connections:1,idle_timeout_ms:2,read_timeout_ms:3,write_timeout_ms:4,}\nlogging {level: info,access_log_enabled:true,}\nroutes{\n\tlol{path_prefix:"/aga",}}metrics{enabled:true,}admin{enabled:true,}';

		expect(parseConfiguration(config)).toBeInstanceOf(Object);
	});
});
