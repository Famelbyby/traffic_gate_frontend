import type { ApexOptions } from 'apexcharts';
import { getTheme } from './theme.svelte';
import type { GraphLine } from '~/types/metric';

export function generateApexOptions<T = string>(
	graphLines: GraphLine<T>[],
	coords: string[],
	height = 400,
	width = 600,
) {
	const theme = getTheme();
	const mainColors = [theme === 'light' ? '#ff6767' : '#6c9af5', theme === 'light' ? '#bd2323' : '#2f5cb5', theme === 'light' ? '#feb3b3' : '#748cbd'];
	const secondColor = theme === 'light' ? 'pink' : 'green';

	return <ApexOptions>{
		chart: {
			background: 'inherit',
			height: `${height}px`,
			width: `${width}px`,
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		tooltip: {
			enabled: true,
			x: {
				show: false,
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: mainColors[0],
				gradientToColors: [secondColor, mainColors[0]],
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 6,
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0,
			},
		},
		series: graphLines.map((graphLine, index) => ({
			name: graphLine.url,
			data: graphLine.graphValues,
			color: mainColors[index % graphLines.length],
		})),
		xaxis: {
			categories: coords,
			labels: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			show: true,
			padding: {
				left: 2,
			},
			labels: {
				colors: theme === 'dark' ? 'white' : 'gray',
				padding: 2,
			},
		},
	};
}
