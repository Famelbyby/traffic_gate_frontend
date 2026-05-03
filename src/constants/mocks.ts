import { generateGraphData } from '~/helpers/generateGraphData';
import type { Props as CellStatProps } from '~/types/cellStat';
import type { Metric } from '~/types/metric';

export const METRICS_DATA_MOCK: Metric[] = [
	{
		id: 0,
		title: 'Bucket',
		footer: 'RPS',
		graphData: generateGraphData(),
		url: '/bucket',
	},
	{
		id: 1,
		title: 'Orders',
		footer: 'Service CPU',
		graphData: generateGraphData(),
		url: '/orders',
	},
	{
		id: 2,
		title: 'Moderation',
		footer: 'RAM load',
		graphData: generateGraphData(),
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
		value: Date.now(),
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
	},
];
