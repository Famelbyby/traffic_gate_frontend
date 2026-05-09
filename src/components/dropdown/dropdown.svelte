<script lang="ts">
	import type { Props } from '~/types/dropdown';
	import DropdownItem from './dropdownItem.svelte';
	import arrow from '~/lib/assets/arrow.png';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { selectedItem, items, changeItem }: Props = $props();

	let opened = $state(false);
	let dropDown = $state<HTMLDivElement | null>(null);

	function setOpened(nextOpened = false) {
		opened = nextOpened;
	}

	function onItemClick(item: string) {
		changeItem(item);
		setOpened(false);
	}

	function catchClick(event: MouseEvent) {
		const target = event.target as HTMLDivElement;

		if (target.closest('.dropdown') !== dropDown && target !== dropDown) {
			setOpened(false);
		}
	}

	onMount(() => {
		setTimeout(() => {
			document.addEventListener('click', catchClick);
		}, 0);
	});

	onDestroy(() => {
		if (browser) {
			document?.removeEventListener('click', catchClick);
		}
	});
</script>

<div class="dropdown" bind:this={dropDown}>
	<div
		class="dropdown-header"
		onclick={() => setOpened(!opened)}
		aria-describedby="Открыть выпадашку">
		<DropdownItem title={selectedItem} onClick={() => {}} />
		<div class="dropdown-button">
			<img
				class={`dropdown-button__img ${opened ? 'dropdown-button__img_reverted' : ''}`}
				src={arrow}
				alt="Открыть/закрыть выпадашку" />
		</div>
	</div>
	<div class="dropdown-menu">
		{#if opened}
			{#each items as item, index (index)}
				<DropdownItem
					isActive={selectedItem === item}
					onClick={() => onItemClick(item)}
					title={item} />
			{/each}
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.dropdown {
		position: relative;
		display: flex;
		flex-direction: column;
		background: white;
		color: black;
		border-radius: 10px;
		padding: 5px 10px;
	}

	.dropdown-menu {
		position: absolute;
		top: 30px;
		display: flex;
		flex-direction: column;
		background: inherit;
		color: inherit;
		z-index: 15;
		left: 0;
	}

	.dropdown-header {
		display: flex;
		align-items: center;
		justify-content: space-around;
		cursor: pointer;
	}

	.dropdown-button__img {
		width: 15px;
		right: 10px;
		top: 10px;
	}

	.dropdown-button__img_reverted {
		transform: rotate(180);
	}
</style>
