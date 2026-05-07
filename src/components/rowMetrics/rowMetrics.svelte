<script lang="ts">
	import MetricCard from '../metricCard/metricCard.svelte';
	import AddMetricCard from '../metricCard/addMetricCard.svelte';
	import { createMetric, getMetrics, removeMetric } from '~/api/metricsPage/metrics';
	import type { CreateMetric, Metric } from '~/types/metric';
	import Portal from 'svelte-portal';
	import Modal from '../modal/modal.svelte';
	import Button from '../button/button.svelte';
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

	async function deleteMetric() {
		if (removePortalMetric === undefined) {
			return;
		}

		metricsData = await removeMetric(removePortalMetric.id);

		closeModal();
	}

	async function addMetric(data: CreateMetric) {
		metricsData = await createMetric(data);
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
		<Button text="Удалить" confirm pink onClick={deleteMetric} />
	</div>
{/snippet}

<div class="row-metrics">
	{#if metricsData !== undefined}
		{#each metricsData as metric (metric.id)}
			<MetricCard {...metric} removeMetric={activateModal} />
		{/each}
	{/if}
	<AddMetricCard pending={metricsData === undefined} {addMetric}/>
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
