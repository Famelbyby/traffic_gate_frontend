import type { Props as CellStatProps } from '~/types/cellStat';

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