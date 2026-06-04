import AxiosClient from '../AxiosClient';
import type { CreateMetric, Metric } from '~/types/metric';
import { generateMetricsMocks } from '~/helpers/generateMetricsMocks';
import {
	getMetricsDataMock,
	setMetricsDataMock,
} from '~/helpers/metricsMocking.svelte';
import { generateGraphsData } from '~/helpers/generateGraphData';

export async function getMetrics() {
	const result = await AxiosClient.get<Metric[]>('/metrics');

	if (result.error !== undefined) {
		generateMetricsMocks();

		return getMetricsDataMock();
	}

	return result.data!;
}

export async function removeMetric(id: number) {
	const result = await AxiosClient.post<Metric[], number>('/metric', id);

	if (result.error !== undefined) {
		const currentMetricsDataMock = getMetricsDataMock();

		setMetricsDataMock(
			currentMetricsDataMock.filter((metric) => metric.id !== id),
		);

		return getMetricsDataMock();
	}

	return result.data!;
}

export async function createMetric(data: CreateMetric) {
	const result = await AxiosClient.post<Metric[], CreateMetric>(
		'/metric/add',
		data,
	);

	if (result.error !== undefined) {
		const currentMetricsDataMock = getMetricsDataMock();

		setMetricsDataMock([
			...currentMetricsDataMock,
			{
				...data,
				id: currentMetricsDataMock.length,
				graphsData: generateGraphsData(0),
			},
		]);

		return getMetricsDataMock();
	}

	return result.data!;
}
