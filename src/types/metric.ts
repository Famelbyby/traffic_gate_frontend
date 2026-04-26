export type Metric = {
	id: number;
	title: string;
	footer: string;
	graphData: GraphPoint[];
	url: string;
};

export type GraphPoint = {
	value: number;
	time: number;
};
