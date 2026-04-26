<script lang="ts">
	import CellStat from '~/components/cellStat/cellStat.svelte';
	import type { Props } from '~/types/rowStats';

	let { stats, className }: Props = $props();
</script>

<div class={`row-stats ${className || ''}`}>
	{#each stats as stat (stat.title)}
		<CellStat {...stat} />
	{/each}
</div>

<style lang="scss" scoped>
	.row-stats {
		display: grid;
		grid-template-columns: repeat(3, 300px);
		width: 100%;
		justify-content: space-evenly;
		align-content: center;
		row-gap: 150px;
		flex-grow: 1;
	}
</style>
