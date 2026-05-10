import type { Configuration } from '~/types/configuration';

let CONFIGURATION_MOCK = $state('admin {\n\tenabled: true,\n}');

export function getConfigurationMock() {
	return CONFIGURATION_MOCK;
}

export function setConfigurationMock(data: Configuration) {
	CONFIGURATION_MOCK = data;
}
