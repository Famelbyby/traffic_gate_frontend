<script lang="ts">
	import type { Props } from '~/types/cellStat';

	let { title, value }: Props = $props();
</script>

<div class="cell-stat">
	<span class="cell-stat__title">
		{title}
	</span>
	<span class="cell-stat__value">
		{value}
	</span>
</div>

<style lang="scss" scoped>
	.cell-stat {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-left: 10px solid #ffc89d;
		border-radius: 10px;
		padding: 50px;
		background-color: #ffecce;
		box-sizing: border-box;
		flex-direction: column;
		max-height: 225px;
	}

	.cell-stat__title {
		font-size: 30px;
		text-align: center;
	}

	.cell-stat__value {
		font-size: 25px;
    	color: #6e1313;
	}
</style>
