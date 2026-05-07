import AxiosClient from '../AxiosClient';
import type { Metric } from '~/types/metric';
import {
	getMetricsDataMock,
} from '~/helpers/metricsMocking.svelte';

export async function getMetric(name: string) {
	const result = await AxiosClient.get<Metric>(`/metric/${name}`);

	if (result.error !== undefined) {
		const metrics = getMetricsDataMock();

        return metrics.find((metric) => metric.url.slice(1) === name);
	}

	return result.data!;
}
