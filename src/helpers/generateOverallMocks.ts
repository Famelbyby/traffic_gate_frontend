import { OVERALL_STATS_MOCK } from '~/constants/mocks';
import { FormatTimestamp } from './formats';

export function generateOverallMocks() {
	let init = OVERALL_STATS_MOCK;

	return () => {
		init = [
			{
				title: 'CPU, %',
				value: (Math.random() * 100).toFixed(1),
			},
			{
				title: 'Время работы',
				value: FormatTimestamp(Date.now()),
			},
			{
				title: 'RAM, Gb',
				value: (Math.random() * 16).toFixed(3),
			},
			{
				title: 'Количество запросов',
				value: <number>init[3].value + Math.floor(Math.random() * 100),
			},
			{
				title: 'Ошибки, %',
				value: '0.06',
			},
			{
				title: 'RPS',
				value: Math.floor(Math.random() * 13000),
			},
		];

		return init;
	};
}
