<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';
	import Button from '../button/button.svelte';
	import type {AddMetricCard as Props} from '~/types/metricCard';

	let {pending}: Props = $props();

	let theme = $derived(getTheme());
</script>

<div class={`add-metric-card add-metric-card_${theme}`}>
	{#if pending}
		<span class="add-metric-card__pending-text">
			Загружаем
		</span>
	{:else}
		<Button text="Добавить метрику" confirm pink />
	{/if}
</div>

<style lang="scss" scoped>
	.add-metric-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 660px;
		height: 509px;
		background: rgb(255 233 219 / 70%);
		padding: 10px 30px;
		border-radius: 20px;
		box-shadow: 2px 4px 3px #ff88a22b;
	}

	.add-metric-card_dark {
		background: #242472;
		box-shadow: 2px 4px 3px #0e00ff2b;
	}

	.add-metric-card__pending-text {
		font-size: 40px;
		color: gray;
		animation: pending-text 2s ease-in 0.5s infinite both alternate;
	}

	@keyframes pending-text {
		from {
			color: gray;
		}
		to {
			color: white;
		}
	}
</style>
