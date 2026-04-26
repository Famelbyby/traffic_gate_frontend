<script lang="ts">
	import type { Props } from '~/types/cellStat';

	let { title, value, pending }: Props = $props();
</script>

<div class={`cell-stat ${pending ? 'cell-stat_pending' : ''}`}>
	<span
		class={`cell-stat__title ${pending ? 'cell-stat__title_pending' : ''}`}>
		{!pending ? title : 'Загружаем'}
	</span>
	{#if !pending}
		<span class="cell-stat__value">
			{value}
		</span>
	{/if}
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
		height: 225px;
	}

	.cell-stat_pending {
		animation: pending-cell 2s ease-in 0.5s infinite both alternate;
	}

	.cell-stat__title {
		font-size: 30px;
		text-align: center;
	}

	.cell-stat__title_pending {
		color: rgb(161, 105, 26);
		user-select: none;
	}

	.cell-stat__value {
		font-size: 25px;
		color: #6e1313;
	}

	@keyframes pending-cell {
		from {
			background-color: #ffecce;
		}

		to {
			background-color: rgb(255, 200, 157);
		}
	}
</style>
