<script lang="ts">
	import Dropdown from '~/components/dropdown/dropdown.svelte';
	import Header from '~/components/header/header.svelte';
	import RowMetrics from '~/components/rowMetrics/rowMetrics.svelte';
	import { METRICS_UPDATE_INTERVALS } from '~/constants/metrics';
	import { getTheme } from '~/helpers/theme.svelte';
	import type { MetricsUpdateInterval } from '~/types/metrics';

	let theme = $derived(getTheme());

	let selectedInterval = $state<MetricsUpdateInterval>('3s');
	let updateInterval = $derived.by(() => {
		switch (selectedInterval) {
			case '3s':
				return 3000;
			case '5s':
				return 5000;
			case '15s':
				return 15000;
			case '30s':
				return 30000;
			case '1m':
				return 60000;
		}
	});

	function changeInterval(nextInterval: string) {
		selectedInterval = nextInterval as MetricsUpdateInterval;
	}
</script>

<div class={`metrics-page metrics-page_${theme}`}>
	{#snippet dropdown()}
		<Dropdown
			selectedItem={selectedInterval}
			items={METRICS_UPDATE_INTERVALS}
			changeItem={changeInterval} />
	{/snippet}

	<Header title="Метрики" snippet={dropdown} />
	<RowMetrics {updateInterval} />
</div>

<style lang="scss" scoped>
	.metrics-page {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-width: 100%;
		padding-right: 30px;
	}

	.metrics-page_dark {
		scrollbar-color: #6c9af5 #000034;
	}
</style>
