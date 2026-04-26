<script lang="ts">
	import type { Props } from '~/types/button';

	let { text, onClick, confirm = false, cancel = false }: Props = $props();
</script>

<button
	class={{
		'base-button': true,
		'base-button_confirm': confirm,
		'base-button_cancel': cancel,
	}}
	onclick={onClick}>
	{text}
</button>

<style lang="scss" scoped>
	.base-button {
		padding: 5px 7px;
		border-radius: 7px;
		box-shadow: 1px 1px 2px black;
	}

	.base-button_confirm {
		background-color: blue;
	}

	.base-button_cancel {
		background-color: red;
	}
</style>
