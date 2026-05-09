import type { GraphPoint } from '~/types/metric';

export function generateGraphData(
	num = 100,
	min = 0,
	max = 300,
) {
	if (num < 0) {
		return [];
	}

	if (num > 1000) {
		num = 1000;
	}

	const data: GraphPoint[] = [];

	for (let i = 0; i < num; ++i) {
		data.push({
			value: min + Math.floor(Math.random() * (max - min)),
			time: Date.now(),
		});
	}

	return data;
}
