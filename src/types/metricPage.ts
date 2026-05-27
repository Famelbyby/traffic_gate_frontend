import type { Metric } from './metric';
import type { Props as CardProps } from './metricCard';

export type Props = {
	metricData: Metric;
};

export type MetricPageGraph = CardProps & {
	width: number;
	height: number;
};

export type MetricPageHeader = {
	url: string;
	type: string;
};

export type MetricStat = 'max' | 'min' | 'avg' | '99p' | 'time' | '50p';
