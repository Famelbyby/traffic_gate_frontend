import type { Metric } from '~/types/metric';

export function getWorkTime(metric: Metric) {
	const data = metric.graphsData[0].points.map((point) => <number>point.time);

	return data[data.length - 1] - data[0];
}
