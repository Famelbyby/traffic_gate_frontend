<script lang="ts">
	import MetricPageHeader from "./metricPageHeader.svelte";
	import MetricPageGraph from "../metricCard/metricPageGraph.svelte";
	import { onMount } from "svelte";
	import RowStats from "../rowStats/rowStats.svelte";
	import type {Props } from "~/types/metricPage";
	import { createMetricStats } from "~/helpers/createMetricStats";

    let {metricData}: Props = $props();
    let width = $state<number>();
    let height = $state<number>();

    let stats = $derived.by(() => createMetricStats(metricData));

    onMount(() => {
        width = window.innerWidth - 300;
        height = window.innerHeight - 200;
    });
</script>

<div class="metric-page-content">
    <MetricPageHeader url={metricData.url} />
    {#if width && height}
        <MetricPageGraph {...metricData} {width} {height} />
        <RowStats {stats} isMetricPage={true}/>
    {/if}
</div>

<style lang="scss" scoped>
	.metric-page-content {
        display: flex;
        flex-direction: column;
    }
</style>