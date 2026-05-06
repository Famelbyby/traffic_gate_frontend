import AxiosClient from '../AxiosClient';
import type { Metric } from '~/types/metric';
import { generateMetricsMocks } from '~/helpers/generateMetricsMocks';
import { getMetricsDataMock } from '~/helpers/metricsMocking.svelte';

export async function getMetrics() {
	const result = await AxiosClient.get<Metric[]>('/metrics');

	if (result.error !== undefined) {
		generateMetricsMocks();

		return getMetricsDataMock();
	}

	return result.data!;
}
