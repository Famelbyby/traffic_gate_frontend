import type { Graph } from '~/types/metric';
import { generateGraphData } from './generateGraphData';
import {
	getMetricsDataMock,
	setMetricsDataMock,
} from './metricsMocking.svelte';

export function updateGraphData(
	graphsData: Graph[],
	num = 1,
	min = 0,
	max = 300,
) {
	graphsData.forEach((data) => data.points.push(...generateGraphData(num, min, max)));
}

export function generateMetricsMocks() {
	const init = getMetricsDataMock();

	init.forEach((metric) => {
		updateGraphData(metric.graphsData);
	});

	setMetricsDataMock(init);
}
