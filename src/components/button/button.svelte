<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';
	import type { Props } from '~/types/button';

	let {
		text,
		onClick,
		confirm = false,
		cancel = false,
		pink = false,
		disabled = false,
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
		'base-button_disabled': disabled,
	}}
	onclick={onClick} disabled={disabled}>
	{text}
</button>

<style lang="scss" scoped>
	.base-button {
		padding: 7px 10px;
		border-radius: 7px;
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

		&:hover {
			filter: brightness(1.2);
		}
	}

	.base-button_disabled {
		filter: brightness(0.7);
		cursor: not-allowed;

		&:hover {
			filter: brightness(0.7);
		}
	}
</style>
