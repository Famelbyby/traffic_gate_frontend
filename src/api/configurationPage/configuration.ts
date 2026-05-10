import {
	getConfigurationMock,
	setConfigurationMock,
} from '~/helpers/configurationMocking.svelte';
import AxiosClient from '../AxiosClient';
import type { Configuration } from '~/types/configuration';

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
