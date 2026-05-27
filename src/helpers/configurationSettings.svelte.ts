import { INITIAL_CONFIGURATION_SETTINGS } from '~/constants/configuration';
import type { ConfigurationSettings } from '~/types/configuration';

let configurationSettings = $state<ConfigurationSettings>(
	INITIAL_CONFIGURATION_SETTINGS,
);

export function getConfigurationSettingsMock() {
	return configurationSettings;
}

export function setConfigurationSettingsMock(
	nextConfigurationSettings: ConfigurationSettings,
) {
	configurationSettings = nextConfigurationSettings;
}
