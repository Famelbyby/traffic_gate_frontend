<script lang="ts">
	import type { Props } from '~/types/modal';
	import close from '~/lib/assets/close.png';
	import { onDestroy, onMount } from 'svelte';

	let { header, content, footerButtons, closeModal, children }: Props =
		$props();

	let windowRef = $state<HTMLDivElement | null>(null);

	function catchClick(event: MouseEvent) {
		const target = event.target as Element;

		if (target.closest('.modal-window') === null && windowRef !== target) {
			closeModal();
		}
	}

	onMount(() => {
		setTimeout(() => {
			document.addEventListener('click', catchClick);
		}, 0);
	});

	onDestroy(() => {
		document.removeEventListener('click', catchClick);
	});
</script>

<div class="modal-page">
	<div class="modal-window" bind:this={windowRef}>
		<button
			type="button"
			class="modal-close"
			aria-label="Закрыть модальное окно"
			onclick={closeModal}>
			<img
				class="modal-close__img"
				src={close}
				alt="Закрыть модальное окно" />
		</button>
		{#if header}
			{@render header()}
		{/if}
		{#if content}
			{@render content()}
		{:else if children}
			{@render children()}
		{/if}
		{#if footerButtons}
			{@render footerButtons()}
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.modal-page {
		position: fixed;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgb(151 151 151 / 70%);
	}

	.modal-window {
		position: relative;
		background: white;
		min-width: 30%;
		min-height: 30%;
		max-height: 90%;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		padding: 50px;
		row-gap: 20px;
	}

	.modal-close {
		position: absolute;
		right: 10px;
		top: 10px;
	}

	.modal-close__img {
		width: 15px;
		height: 15px;
		cursor: pointer;
	}
</style>
