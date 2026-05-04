<script lang="ts">
	import MetricCard from '../metricCard/metricCard.svelte';
	import AddMetricCard from '../metricCard/addMetricCard.svelte';
	import { getMetrics } from '~/api/metricsPage/metrics';
	import { UPDATE_METRICS_INTERVAL } from '~/constants/metrics';
	import type { Metric } from '~/types/metric';

	let metricsData = $state<Metric[] | undefined>(undefined);

	$effect(() => {
		const intervalId = setInterval(async () => {
			metricsData = await getMetrics();
		}, UPDATE_METRICS_INTERVAL);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div class="row-metrics">
	{#if metricsData !== undefined}
		{#each metricsData as metric (metric.id)}
			<MetricCard {...metric} />
		{/each}
	{/if}
	<AddMetricCard pending={metricsData === undefined} />
</div>

<style lang="scss" scoped>
	.row-metrics {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		row-gap: 20px;
	}
</style>
