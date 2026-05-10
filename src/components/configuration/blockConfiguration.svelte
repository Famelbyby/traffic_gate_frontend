<script lang="ts">
	import Button from '../button/button.svelte';
	import FlowBoard from './flowBoard.svelte';
</script>

<div class="block-configuration">
	<FlowBoard />
	<Button text="Перевести в текстовый вид" confirm />
</div>

<style lang="scss" scoped>
	.block-configuration {
		display: flex;
		width: 100%;
		padding: 10px;
	}

	.block-configuration__flow-board {
		display: flex;
		flex-grow: 1;
		min-width: 225px;
		width: 100%;
		max-width: 1000px;
	}
</style>
