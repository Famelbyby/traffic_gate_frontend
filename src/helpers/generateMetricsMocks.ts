import type { GraphPoint } from '~/types/metric';
import { generateGraphData } from './generateGraphData';
import {
	getMetricsDataMock,
	setMetricsDataMock,
} from './metricsMocking.svelte';

export function updateGraphData(
	graphData: GraphPoint[],
	num = 1,
	min = 0,
	max = 300,
) {
	graphData.push(...generateGraphData(num, min, max, graphData.length));
}

export function generateMetricsMocks() {
	const init = getMetricsDataMock();

	init.forEach((metric) => {
		updateGraphData(metric.graphData);
	});

	setMetricsDataMock(init);
}
