<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from '../button/button.svelte';
	import { browser } from '$app/environment';
	import Modal from '../modal/modal.svelte';
	import { getTheme } from '~/helpers/theme.svelte';
	import type { Configuration } from '~/types/configuration';
	import {
		getConfiguration,
		postConfiguration,
	} from '~/api/configurationPage/configuration';
	import { parseConfiguration } from '~/helpers/configParser';

	let initText = $state<Configuration | undefined>(undefined);
	let currentText = $state<Configuration | undefined>(undefined);
	let cancelChangesModal = $state(false);
	let theme = $derived(getTheme());
	let configValue = $derived(parseConfiguration(currentText || ''));
	let error = $derived(configValue instanceof Error);

	let ref = $state<HTMLTextAreaElement | null>(null);

	function onChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;

		if (target) {
			currentText = target.value;
		}
	}

	function tabClickCatcher(event: Event) {
		if (ref === null || currentText === undefined) {
			return;
		}

		if ((event as KeyboardEvent).key === 'Tab') {
			event.preventDefault();

			const start = ref.selectionStart;
			const end = ref.selectionEnd;

			currentText =
				currentText.substring(0, start) +
				'\t' +
				currentText.substring(end);

			setTimeout(() => {
				if (ref !== null) {
					ref.selectionStart = ref.selectionEnd = start + 1;
				}
			});
		}
	}

	function openModal() {
		cancelChangesModal = true;
	}

	async function acceptChanges() {
		if (currentText === undefined) {
			return;
		}

		initText = await postConfiguration(currentText);
	}

	function cancelChanges() {
		currentText = initText;

		closeModal();
	}

	function closeModal() {
		cancelChangesModal = false;
	}

	onMount(async () => {
		document.addEventListener('keydown', tabClickCatcher);

		const config = await getConfiguration();

		initText = currentText = config;
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', tabClickCatcher);
		}
	});
</script>

{#snippet content()}
	<div class="cancel-changes-modal__content">
		Вы уверены, что хотите отменить изменения?
	</div>
{/snippet}

{#snippet footerButtons()}
	<Button text="Отменить изменения" cancel onClick={cancelChanges} />
{/snippet}

{#if initText !== undefined}
	<div class="text-configuration">
		<div class="text-configuration-left">
			<textarea
				bind:this={ref}
				name="configuration"
				class={`text-configuration__textarea text-configuration__textarea_${theme}`}
				oninput={onChange}>{currentText}</textarea>
			<div class="text-configuration-buttons">
				<Button
					text="Сохранить"
					disabled={error}
					confirm
					pink
					onClick={acceptChanges} />
				<Button
					text="Отменить изменения"
					disabled={currentText === initText}
					cancel
					onClick={openModal} />
			</div>
		</div>
		<div
			class={`text-configuration-right ${error ? 'text-configuration-right_error' : ''} text-configuration-right_${theme}`}>
			{#if configValue instanceof Error}
				<span class="text-configuration-right__error"
					>Ошибка: {configValue.message}</span>
			{:else}
				<span class="text-configuration-right__result">Результат:</span>
				<pre>{JSON.stringify(configValue, null, ' ')}</pre>
			{/if}
		</div>
		{#if cancelChangesModal}
			<Modal {content} {footerButtons} {closeModal} />
		{/if}
	</div>
{:else}
	<div class="text-configuration_skeleton">Загружаем</div>
{/if}

<style lang="scss" scoped>
	pre {
		display: flex;
		flex-grow: 1;
		min-height: 0;
		overflow-y: auto;
	}

	.text-configuration {
		display: flex;
		flex-grow: 1;
		width: 100%;
		margin-top: 30px;
		gap: 20px;
	}

	.text-configuration-left {
		display: flex;
		flex-direction: column;
		min-width: 225px;
		width: 100%;
		max-width: 800px;
		row-gap: 20px;
	}

	.text-configuration-right {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		border-radius: 10px;
		padding: 5px 10px;
		box-sizing: border-box;
		border: 1px solid #8fff8f;
		background: #8fff8f;
	}

	.text-configuration-right_dark {
		border: 1px solid #6c9af5;
		background: #6c9af5;
	}

	.text-configuration-right_error {
		background: #ff7373;
		border: 1px solid #ff7373;
	}

	.text-configuration_skeleton {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		animation: pending-text 2s ease-in 0.5s infinite both alternate;
	}

	.text-configuration__textarea {
		display: flex;
		flex-grow: 1;
		border-radius: 10px;
		border: 1px solid black;
		padding: 7px 10px;
		box-sizing: border-box;
		resize: none;

		&:focus-visible {
			outline: none;
		}
	}

	.text-configuration__textarea_dark {
		color: #493697;
		background: #fdfcff;
	}

	.text-configuration-buttons {
		display: flex;
		justify-content: end;
		column-gap: 30px;
		align-items: center;
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
