import { METRICS_DATA_MOCK } from '~/constants/mocks';
import type { GraphPoint } from '~/types/metric';
import { generateGraphData } from './generateGraphData';

export function updateGraphData(
	graphData: GraphPoint[],
	num = 1,
	min = 0,
	max = 300,
) {
	graphData.push(...generateGraphData(num, min, max, graphData.length));
}

export function generateMetricsMocks() {
	const init = METRICS_DATA_MOCK;

	return () => {
		init.forEach((metric) => {
			updateGraphData(metric.graphData);
		});

		return init;
	};
}
