<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';
	import type { Props } from '~/types/button';

	let {
		text,
		onClick,
		confirm = false,
		cancel = false,
		pink = false,
	}: Props = $props();

	let theme = $derived(getTheme());
</script>

<button
	class={{
		'base-button': true,
		'base-button_confirm': confirm,
		'base-button_cancel': cancel,
		'base-button_pink': pink,
		'base-button_pink_dark': pink && theme === 'dark',
	}}
	onclick={onClick}>
	{text}
</button>

<style lang="scss" scoped>
	.base-button {
		padding: 7px 10px;
		border-radius: 7px;
		box-shadow: 1px 1px 2px black;
	}

	.base-button_confirm {
		background-color: blue;
		color: white;
	}

	.base-button_pink {
		background-color: #ffbcbc;
		box-shadow: none;
		transition-duration: 0.3s;

		&:hover {
			background-color: #ff8181;
		}
	}

	.base-button_pink_dark {
		background-color: #6c9af5;

		&:hover {
			background-color: #5a35fb;
		}
	}

	.base-button_cancel {
		background-color: rgb(220, 0, 0);
		color: white;
	}

	
</style>
