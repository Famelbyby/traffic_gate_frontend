<script>
	import Button from '../button/button.svelte';
</script>

<div class="add-metric-card">
	<Button text="Добавить метрику" confirm />
</div>

<style lang="scss" scoped>
	.add-metric-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 560px;
		height: 509px;
		background: rgb(255 233 219 / 70%);
		padding: 10px 30px;
		border-radius: 20px;
		box-shadow: 2px 4px 3px #ff88a22b;
	}
</style>
