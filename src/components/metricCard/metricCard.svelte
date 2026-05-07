<script lang="ts">
	import type { Metric } from '~/types/metric';
	import MetricCardGraph from './metricCardGraph.svelte';
	import remove from '~/lib/assets/close.png';
	import { getTheme } from '~/helpers/theme.svelte';

	let { id, title, graphData, url, removeMetric, type }: Metric = $props();
	let cardRef = $state<HTMLDivElement | null>(null);
	let closeButtonRef = $state<HTMLDivElement | null>(null);
	let theme = $derived(getTheme());

	function clicked(e: Event) {
		if (cardRef && e.target !== cardRef) {
			e.preventDefault();
		}

		if (closeButtonRef && e.target === closeButtonRef) {
			removeMetric?.({ id, title, graphData, url, type });
		}
	}
</script>

<a href={`/metric${url}`} onclick={clicked}>
	<div class={`metric-card metric-card_${theme}`} bind:this={cardRef}>
		<div class="metric-card__header">
			{title}
			{#if removeMetric}
				<div class="metric-card-remove">
					<img
						class={`metric-card-remove__img metric-card-remove__img_${theme}`}
						src={remove}
						alt="Удалить метрику"
						title="Удалить метрику"
						bind:this={closeButtonRef} />
				</div>
			{/if}
		</div>
		<div class="metric-card__graph">
			<MetricCardGraph {graphData} {url} />
		</div>
		<div class="metric-card__footer">
			{type}
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

	.metric-card_dark {
		background: #242472;
		box-shadow: 2px 4px 3px #0e00ff2b;
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

	.metric-card-remove__img_dark {
		filter: invert(1);
	}

	.metric-card__header {
		font-size: 20px;
	}
</style>
