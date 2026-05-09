<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from '../button/button.svelte';
	import { browser } from '$app/environment';
	import Modal from '../modal/modal.svelte';
	import { getTheme } from '~/helpers/theme.svelte';

	let initText = $state('');
	let currentText = $state('');
	let cancelChangesModal = $state(false);
	let theme = $derived(getTheme());

	let ref = $state<HTMLTextAreaElement | null>(null);

	function onChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;

		if (target) {
			currentText = target.value;
		}
	}

	function tabClickCatcher(event: Event) {
		if (ref === null) {
			return;
		}

		if ((event as KeyboardEvent).key === 'Tab') {
			event.preventDefault();

			const start = ref.selectionStart;
			const end = ref.selectionEnd;

			currentText = currentText.substring(0, start) + '\t' + currentText.substring(end);

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

	function cancelChanges() {
		currentText = initText;

		closeModal();
	}

	function closeModal() {
		cancelChangesModal = false;
	}

	onMount(() => {
		document.addEventListener('keydown', tabClickCatcher);
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
	<Button text='Отменить изменения' cancel onClick={cancelChanges}/>
{/snippet}

<div class="text-configuration">
	<textarea bind:this={ref} name="configuration" class={`text-configuration__textarea text-configuration__textarea_${theme}`} oninput={onChange}
		>{currentText}</textarea>
	<div class="text-configuration-buttons">
		<Button text="Сохранить" confirm />
		<Button text="Отменить изменения" disabled={currentText === initText} cancel onClick={openModal}/>
	</div>
	{#if cancelChangesModal}
		<Modal {content} {footerButtons} {closeModal}/>
	{/if}
</div>

<style lang="scss" scoped>
	.text-configuration {
		display: flex;
		flex-grow: 1;
		min-width: 225px;
		width: 100%;
		max-width: 800px;
		margin-top: 30px;
		flex-direction: column;
		row-gap: 20px;
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
</style>
