<script lang="ts">
	import Header from '~/components/header/header.svelte';
	import RowMetrics from '~/components/rowMetrics/rowMetrics.svelte';
	import { getTheme } from '~/helpers/theme.svelte';

	let theme = $derived(getTheme());
</script>

<div class={`metrics-page metrics-page_${theme}`}>
	<Header title="Метрики" />
	<RowMetrics />
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
