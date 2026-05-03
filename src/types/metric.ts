export type Metric = {
	id: number;
	title: string;
	footer: string;
	graphData: GraphPoint[];
	url: string;
	workTime?: number;
};

export type GraphPoint = {
	value: number;
	time: number;
};
