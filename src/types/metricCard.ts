import type { CreateMetric, Graph } from './metric';

export type Props = {
	graphsData: Graph[];
	url: string;
}

export type AddMetricCard = {
	pending: boolean;
	addMetric: (data: CreateMetric) => void;
};
