export type MetricType = 'CPU' | 'RPS' | 'RAM';

export type Metric = {
	id: number;
	title: string;
	footer: string;
	graphData: GraphPoint[];
	url: string;
	workTime?: number;
	removeMetric?: (metric: Metric) => void;
	type: MetricType;
};

export type GraphPoint = {
	value: number;
	time: number;
};
