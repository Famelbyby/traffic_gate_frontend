export type Metric = {
	id: number;
	title: string;
	graphsData: Graph[];
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

export type Graph = {
	points: GraphPoint[];
	url: string;
}

export type GraphLine<T = number> = {
	url: string;
	graphValues: T[];
}
