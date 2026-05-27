import {
	getConfigurationMock,
	setConfigurationMock,
} from '~/helpers/configurationMocking.svelte';
import AxiosClient from '../AxiosClient';
import type {
	Configuration,
	ConfigurationSettings,
} from '~/types/configuration';
import {
	getConfigurationSettingsMock,
	setConfigurationSettingsMock,
} from '~/helpers/configurationSettings.svelte';

export async function getConfiguration() {
	const result = await AxiosClient.get<Configuration>('/configuration');

	if (result.error !== undefined) {
		return getConfigurationMock();
	}

	return result.data!;
}

export async function postConfiguration(data: Configuration) {
	const result = await AxiosClient.post<Configuration, Configuration>(
		'/configuration',
		data,
	);

	if (result.error !== undefined) {
		setConfigurationMock(data);

		return getConfigurationMock();
	}

	return result.data!;
}

export async function getConfigurationSettings() {
	const result = await AxiosClient.get<ConfigurationSettings>(
		'/configuration/settings',
	);

	if (result.error !== undefined) {
		return getConfigurationSettingsMock();
	}

	return result.data!;
}

export async function postConfigurationSettings(data: ConfigurationSettings) {
	const result = await AxiosClient.post<
		ConfigurationSettings,
		ConfigurationSettings
	>('/configuration/settings', data);

	if (result.error !== undefined) {
		setConfigurationSettingsMock(data);

		return getConfigurationSettingsMock();
	}

	return result.data!;
}
