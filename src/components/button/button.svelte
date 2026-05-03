<script lang="ts">
	import type { Props } from '~/types/button';

	let { text, onClick, confirm = false, cancel = false, pink = false }: Props = $props();
</script>

<button
	class={{
		'base-button': true,
		'base-button_confirm': confirm,
		'base-button_cancel': cancel,
		'base-button_pink': pink,
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

	.base-button_cancel {
		background-color: rgb(220, 0, 0);
		color: white;
	}
</style>
