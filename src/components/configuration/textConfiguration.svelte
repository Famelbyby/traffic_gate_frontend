<script lang="ts">
	import Button from '../button/button.svelte';

	let currentText = $state('');

	function onChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;

		if (target) {
			currentText = target.value;
		}
	}
</script>

<div class="text-configuration">
	<textarea class="text-configuration__textarea" onchange={onChange}
		>{currentText}</textarea>
	<Button text="Сохранить" confirm />
	<Button text="Отменить изменения" cancel />
</div>

<style lang="scss" scoped>
	.text-configuration {
		display: flex;
		width: 100%;
		padding: 10px;
	}

	.text-configuration__textarea {
		display: flex;
		flex-grow: 1;
		border-radius: 10px;
		border: 1px solid black;
	}
</style>
