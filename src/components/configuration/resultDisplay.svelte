<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';

	export type Props = {
		configValue: object | Error | string;
		error?: boolean;
	};

	let { configValue, error }: Props = $props();
	let theme = $derived(getTheme());
</script>

<div
	class={`result-display ${error ? 'result-display_error' : ''} result-display_${theme}`}>
	{#if configValue instanceof Error}
		<span class="result-display__error">Ошибка: {configValue.message}</span>
	{:else}
		<span class="result-display__result">Результат:</span>
		<pre class="result-display__text">{configValue instanceof Object
				? JSON.stringify(configValue, null, ' ')
				: configValue}</pre>
	{/if}
</div>

<style lang="scss">
	.result-display {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		border-radius: 10px;
		padding: 5px 10px;
		box-sizing: border-box;
		border: 1px solid #8fff8f;
		background: #8fff8f;
	}

    .result-display__text {
        overflow: auto;
    }

	.result-display_dark {
		border: 1px solid #6c9af5;
		background: #6c9af5;
	}

	.result-display_error {
		background: #ff7373;
		border: 1px solid #ff7373;
	}
</style>
