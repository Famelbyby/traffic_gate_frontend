<script lang="ts">
	import Header from '~/components/header/header.svelte';
	import RowMetrics from '~/components/rowMetrics/rowMetrics.svelte';
</script>

<div class="metrics-page">
	<Header title="Метрики" />
	<RowMetrics />
</div>

<style lang="scss" scoped>
	.metrics-page {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-width: 100%;
	}
</style>
