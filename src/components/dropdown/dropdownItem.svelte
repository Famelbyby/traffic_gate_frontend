<script lang="ts">
	import type { DropdownItem as Props } from '~/types/dropdown';

	let { isActive, title, onClick }: Props = $props();
</script>

<button
	type="button"
	class={`dropdown-item ${isActive && 'dropdown-item_active'}`}
	onclick={onClick}
	aria-label="Активировать элемент">
	{title}
</button>

<style lang="scss" scoped>
	.dropdown-item {
		cursor: pointer;
		transition-duration: 0.3s;
		background: inherit;
		color: inherit;
		padding-right: 20px;
		height: 30px;
		padding: 5px 10px;

		&:hover {
			filter: brightness(0.8);
		}
	}

	.dropdown-item_active {
		filter: brightness(0.5);
	}
</style>
