<script lang="ts">
	import MetricCard from '../metricCard/metricCard.svelte';
	import AddMetricCard from '../metricCard/addMetricCard.svelte';
	import { getMetrics } from '~/api/metricsPage/metrics';
	import type { Metric } from '~/types/metric';
	import Portal from 'svelte-portal';
	import Modal from '../modal/modal.svelte';
	import Button from '../button/button.svelte';
	import { setMetricsDataMock } from '~/helpers/metricsMocking.svelte';
	import type { Props } from '~/types/rowMetrics';

	let {updateInterval}: Props = $props();

	let metricsData = $state<Metric[] | undefined>(undefined);
	let removePortalMetric = $state<Metric | undefined>(undefined);

	$effect(() => {
		const intervalId = setInterval(async () => {
			metricsData = await getMetrics();
		}, updateInterval);

		return () => {
			clearInterval(intervalId);
		};
	});

	function activateModal(metric: Metric) {
		removePortalMetric = metric;
	}

	function removeMetric() {
		if (metricsData !== undefined) {
			setMetricsDataMock(metricsData.filter((val) => val.id !== removePortalMetric?.id));
		}

		closeModal();
	}

	function closeModal() {
		removePortalMetric = undefined;
	}
</script>

{#snippet removeContent()}
	<div class="remove-metric-content">
		Вы уверены, что хотите удалить метрику {removePortalMetric?.title}?
	</div>
{/snippet}
{#snippet removeFooterButtons()}
	<div class="remove-metric-footer">
		<Button text="Удалить" confirm pink onClick={removeMetric} />
	</div>
{/snippet}

<div class="row-metrics">
	{#if metricsData !== undefined}
		{#each metricsData as metric (metric.id)}
			<MetricCard {...metric} removeMetric={activateModal} />
		{/each}
	{/if}
	<AddMetricCard pending={metricsData === undefined} />
	{#if removePortalMetric !== undefined}
		<Portal>
			<Modal content={removeContent} footerButtons={removeFooterButtons} {closeModal}/>
		</Portal>
	{/if}
</div>

<style lang="scss" scoped>
	.row-metrics {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		row-gap: 20px;
	}

	.remove-metric-content {
		font-size: 27px;
	}

	.remove-metric-footer {
		font-size: 25px;
		display: flex;
		column-gap: 50px;
	}
</style>
