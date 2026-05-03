<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import Header from '~/components/header/header.svelte';
	import MetricPage from '~/components/metricPage/metricPage.svelte';
	import { METRICS_DATA_MOCK } from '~/constants/mocks';

	let { params } = $props();

	let metricData = $derived(
		METRICS_DATA_MOCK.find((metric) => metric.url.slice(1) === params.name),
	);

	$effect(() => {
		if (metricData === undefined) {
			redirect(303, '/metrics');
		}
	});
</script>

<div class="metric-page">
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
</style>
