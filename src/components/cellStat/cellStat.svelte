<script lang="ts">
	import type { Props } from '~/types/cellStat';

	let { title, value, withBorder = false }: Props = $props();
</script>

<div class={`cell-stat ${withBorder ? 'cell-stat_bordered' : ''}`}>
	<span class="cell-stat__title">
		{title}
	</span>
	<span class="cell-stat__stat">
		{value}
	</span>
</div>

<style lang="scss" scoped>
	.cell-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 10px;
		border: 0px solid black;
		border-radius: 10px;
		padding: 5px;
	}

	.cell-stat_bordered {
		border-width: 1px;
	}
</style>
