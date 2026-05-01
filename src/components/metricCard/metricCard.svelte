<script lang="ts">
	import type { Metric } from '~/types/metric';
	import MetricCardGraph from './metricCardGraph.svelte';

	let { title, footer, graphData, url }: Metric = $props();
</script>

<div class="metric-card">
	<div class="metric-card__header">
		{title}
	</div>
	<div class="metric-card__graph">
		<MetricCardGraph {graphData} {url} />
	</div>
	<div class="metric-card__footer">
		{footer}
	</div>
</div>

<style lang="scss" scoped>
	.metric-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 10px;
		background: rgb(255 233 219 / 70%);
		padding: 10px 30px;
		border-radius: 20px;
		box-shadow: 2px 4px 3px #ff88a22b;
	}

	.metric-card__header {
		font-size: 20px;
	}
</style>
