import type { Metric } from '~/types/metric';
import { generateGraphsData } from './generateGraphData';

let METRICS_DATA_MOCK = $state<Metric[]>([
	{
		id: 0,
		title: 'Bucket',
		graphsData: generateGraphsData(),
		url: '/bucket',
		type: 'RPS',
	},
	{
		id: 1,
		title: 'Orders',
		graphsData: generateGraphsData(),
		url: '/orders',
		type: 'CPU',
	},
	{
		id: 2,
		title: 'Moderation',
		graphsData: generateGraphsData(),
		url: '/moderation',
		type: 'RAM',
	},
]);

export function setMetricsDataMock(nextData: Metric[]) {
	METRICS_DATA_MOCK = nextData;
}

export function getMetricsDataMock() {
	return METRICS_DATA_MOCK;
}
