import type { CreateMetric, Metric } from './metric';

export type Props = Pick<Metric, 'graphData' | 'url'>;

export type AddMetricCard = {
	pending: boolean;
	addMetric: (data: CreateMetric) => void;
};
