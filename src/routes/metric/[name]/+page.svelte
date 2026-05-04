<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '~/components/header/header.svelte';
	import MetricPage from '~/components/metricPage/metricPage.svelte';
	import { METRICS_DATA_MOCK } from '~/constants/mocks';
	import { getTheme } from '~/helpers/theme.svelte';

	let { params } = $props();

	let metricData = $derived(
		METRICS_DATA_MOCK.find((metric) => metric.url.slice(1) === params.name),
	);
	let theme = $derived(getTheme());

	$effect(() => {
		if (metricData === undefined) {
			goto('/metrics');
		}
	});
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
