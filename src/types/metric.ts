export type Metric = {
	id: number;
	title: string;
	graphData: GraphPoint[];
	url: string;
	workTime?: number;
	removeMetric?: (metric: Metric) => void;
	type: string;
};

export type CreateMetric = Pick<Metric, 'type' | 'url' | 'title'>;

export type GraphPoint = {
	value: number;
	time: number;
};
