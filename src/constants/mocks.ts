import { generateGraphData } from '~/helpers/generateGraphData';
import type { Props as CellStatProps } from '~/types/cellStat';
import type { GraphPoint, Metric } from '~/types/metric';

export const GRATH_DATA_MOCK: GraphPoint[] = generateGraphData(30);

export const METRICS_DATA_MOCK: Metric[] = [
	{
		id: 0,
		title: 'Bucket',
		footer: 'RPS 312',
		graphData: GRATH_DATA_MOCK,
		url: '/bucket',
	},
	{
		id: 1,
		title: 'Orders',
		footer: 'RPS 112',
		graphData: GRATH_DATA_MOCK,
		url: '/orders',
	},
	{
		id: 2,
		title: 'Moderation',
		footer: 'RPS 312',
		graphData: GRATH_DATA_MOCK,
		url: '/moderation',
	},
];

export const OVERALL_STATS_MOCK: CellStatProps[] = [
	{
		title: 'CPU, %',
		value: 20,
	},
	{
		title: 'Время работы',
		value: '00:12:38',
	},
	{
		title: 'RAM, Gb',
		value: '0.460',
	},
	{
		title: 'Количество запросов',
		value: 237,
	},
	{
		title: 'Ошибки, %',
		value: '0.06',
	},
	{
		title: 'RPS',
		value: '1783',
	}
];
