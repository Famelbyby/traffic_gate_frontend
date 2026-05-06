import type { MetricStat } from '~/types/metricPage';

export const METRIC_STAT_TITLES: Record<MetricStat, string> = {
	'99p': '99-й перцентиль',
	'50p': '50-й перцентиль',
	max: 'Значение в пике',
	min: 'Мин. значение',
	time: 'Время работы',
	avg: 'Среднее значение',
};

export const DEFAULT_WORK_TIME_TITLE = 'Не отсчитывается';
