import type { Configuration } from '~/types/configuration';

let CONFIGURATION_MOCK = $state('listener {\n\t- address: "127.0.0.1:8080",\n\t- max_connections: 1000,\n\t- idle_timeout_ms: 30000,\n}\n\nadmin {\n\t- enabled: true,\n\t- address: "127.0.0.1:9090",\n}');

export function getConfigurationMock() {
	return CONFIGURATION_MOCK;
}

export function setConfigurationMock(data: Configuration) {
	CONFIGURATION_MOCK = data;
}
