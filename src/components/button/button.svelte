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
		padding: 7px 10px;
		border-radius: 7px;
		box-shadow: 1px 1px 2px black;
	}

	.base-button_confirm {
		background-color: blue;
		color: white;
	}

	.base-button_cancel {
		background-color: rgb(220, 0, 0);
		color: white;
	}
</style>
