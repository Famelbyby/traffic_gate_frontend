<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';
	import type { Props } from '~/types/cellStat';

	let { title, value, pending, isMetricStat = false }: Props = $props();
	let theme = $derived(getTheme());
</script>

<div
	class={`cell-stat cell-stat_${theme} ${isMetricStat ? 'cell-stat_metric' : ''} ${pending ? 'cell-stat_pending cell-stat_pending_' + theme : ''}`}>
	<span
		class={`cell-stat__title ${pending ? 'cell-stat__title_pending cell-stat__title_pending_' + theme : ''}`}>
		{!pending ? title : 'Загружаем'}
	</span>
	{#if !pending}
		<span class={`cell-stat__value cell-stat__value_${theme}`}>
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
		background: #ffecce;
		box-sizing: border-box;
		flex-direction: column;
		min-height: 225px;
		height: 18vh;
		width: 15vw;
	}

	.cell-stat_dark {
		border-left-color: #6971ca;
		background-color: #2727a6;
	}

	.cell-stat_pending {
		animation: pending-cell 2s ease-in 0.5s infinite both alternate;
	}

	.cell-stat_pending_dark {
		animation: pending-cell_dark 2s ease-in 0.5s infinite both alternate;
	}

	.cell-stat_metric {
		border-left: 10px solid #ff6767;
		background-color: #ffbcbc;
		color: white;
	}

	.cell-stat__title {
		font-size: 30px;
		text-align: center;
	}

	.cell-stat__title_pending {
		color: rgb(161, 105, 26);
		user-select: none;
	}

	.cell-stat__title_pending_dark {
		color: #bdbdbd;
	}

	.cell-stat__value {
		font-size: 25px;
		color: #6e1313;
		text-align: center;
	}

	.cell-stat__value_dark {
		color: #bdbdbd;
	}

	@keyframes pending-cell {
		from {
			background-color: #ffecce;
		}

		to {
			background-color: rgb(255, 200, 157);
		}
	}

	@keyframes pending-cell_dark {
		from {
			background-color: #2727a6;
		}

		to {
			background-color: #6971ca;
		}
	}
</style>
