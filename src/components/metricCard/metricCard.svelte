<script lang="ts">
	import type { Metric } from '~/types/metric';
	import MetricCardGraph from './metricCardGraph.svelte';
	import remove from '~/lib/assets/close.png';

	let { title, footer, graphData, url }: Metric = $props();
	let cardRef = $state<HTMLDivElement | null>(null);
	let closeButtonRef = $state<HTMLDivElement | null>(null);

	function clicked(e: Event) {
		if (cardRef && e.target !== cardRef) {
			e.preventDefault();
		}

		if (closeButtonRef && e.target === closeButtonRef) {
			//console.log('here');
		}
	}
</script>

<a href={`/metric${url}`} onclick={clicked}>
	<div class="metric-card" bind:this={cardRef}>
		<div class="metric-card__header">
			{title}
			<div class="metric-card-remove">
				<img
					class="metric-card-remove__img"
					src={remove}
					alt="Удалить метрику"
					title="Удалить метрику"
					bind:this={closeButtonRef} />
			</div>
		</div>
		<div class="metric-card__graph">
			<MetricCardGraph {graphData} {url} />
		</div>
		<div class="metric-card__footer">
			{footer}
		</div>
	</div>
</a>

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
		cursor: pointer;
		transition-duration: 0.3s;
		position: relative;

		&:hover {
			transform: translateY(-10px);
		}
	}

	.metric-card-remove__img {
		opacity: 0.5;
		width: 15px;
		height: 15px;
		cursor: pointer;
		right: 10px;
		top: 10px;
		position: absolute;

		&:hover {
			opacity: 1;
		}
	}

	.metric-card__header {
		font-size: 20px;
	}
</style>
