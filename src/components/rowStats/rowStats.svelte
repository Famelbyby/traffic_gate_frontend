<script lang="ts">
	import CellStat from "~/components/cellStat/cellStat.svelte";
	import type { Props } from "~/types/rowStats";

    let {stats, className}: Props = $props();
</script>

<div class={`row-stats ${className || ''}`}>
    {#each stats as stat(stat.title)}
        <CellStat {...stat} />
    {/each}
</div>

<style lang="scss" scoped>
    .row-stats {
        display: flex;
        flex-wrap: wrap;
    }
</style>