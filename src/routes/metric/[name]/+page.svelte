<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { getMetric } from '~/api/metricPage/metric.js';
	import Header from '~/components/header/header.svelte';
	import MetricPage from '~/components/metricPage/metricPage.svelte';
	import { updateGraphData } from '~/helpers/generateMetricsMocks.js';
	import { getTheme } from '~/helpers/theme.svelte';
	import type { Metric } from '~/types/metric.js';

	let { params } = $props();

	let metricData = $state<Metric | undefined>(undefined);
	let theme = $derived(getTheme());
	let id = $state<number | undefined>(undefined);

	onMount(async () => {
		const result = await getMetric(params.name);

		if (result === undefined) {
			goto('/metrics');

			return;
		}

		metricData = result;

		const source = new EventSource('/metric/real-time', {
			withCredentials: true,
		});

		source.addEventListener('message', (event) => {
			metricData = event.data;
		});

		source.addEventListener('error', () => {
			id = <number><unknown>setInterval(() => {
				if (metricData === undefined) {
					return;
				}

				updateGraphData(metricData.graphData);

				metricData = {...metricData};
			}, 1000);
		});
	})

	onDestroy(() => {
		clearInterval(id);
	})
</script>

<div class={`metric-page metric-page_${theme}`}>
	{#if metricData !== undefined}
		<Header title={`Метрика ${metricData?.title}`} />
		<MetricPage {metricData} />
	{/if}
</div>

<style lang="scss" scoped>
	.metric-page {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow-y: auto;
		padding-right: 30px;
	}

	.metric-page_dark {
		scrollbar-color: #6c9af5 #000034;
	}
</style>
