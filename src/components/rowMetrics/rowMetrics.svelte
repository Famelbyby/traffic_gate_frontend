<script lang="ts">
	import { METRICS_DATA_MOCK } from "~/constants/mocks";
	import MetricCard from "../metricCard/metricCard.svelte";
	import AddMetricCard from "../metricCard/addMetricCard.svelte";
</script>

<div class="row-metrics">
    {#each METRICS_DATA_MOCK as metric(metric.id)}
        <MetricCard {...metric} />
    {/each}
    <AddMetricCard />
</div>

<style lang="scss" scoped>
    .row-metrics {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>