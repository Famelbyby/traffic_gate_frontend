import type { ApexOptions } from 'apexcharts';
import { getTheme } from './theme.svelte';

export function generateApexOptions<T = string>(
	title: string,
	values: T[],
	coords: number[],
	height = 400,
	width = 600,
) {
	const theme = getTheme();
	const mainColor = theme === 'light' ? '#ff6767' : '#6c9af5';
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
				shade: mainColor,
				gradientToColors: [secondColor, mainColor],
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
		series: [
			{
				name: title,
				data: values,
				color: mainColor,
			},
		],
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
				colors: theme === 'dark' ? 'white': 'gray',
			}
		},
	};
}
