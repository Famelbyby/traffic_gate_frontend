<script lang="ts">
	import { METRICS_DATA_MOCK } from '~/constants/mocks';
	import MetricCard from '../metricCard/metricCard.svelte';
	import AddMetricCard from '../metricCard/addMetricCard.svelte';
	import { getMetrics } from '~/api/metricsPage/metrics';
	import { UPDATE_METRICS_INTERVAL } from '~/constants/metrics';

	let metricsData = $state(METRICS_DATA_MOCK);

	$effect(() => {
		const intervalId = setInterval(async () => {
			metricsData = await getMetrics();
		}, UPDATE_METRICS_INTERVAL);

		return () => {
			clearInterval(intervalId);
		}
	});
</script>

<div class="row-metrics">
	{#each metricsData as metric (metric.id)}
		<MetricCard {...metric} />
	{/each}
	<AddMetricCard />
</div>

<style lang="scss" scoped>
	.row-metrics {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		row-gap: 20px;
	}
</style>
