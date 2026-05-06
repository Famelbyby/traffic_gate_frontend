<script lang="ts">
	import type { Props } from '~/types/header';

	let { title = 'Заголовок', snippet }: Props = $props();
</script>

<div class="header">
	<h2 class="header__title">
		{title}
	</h2>
	{#if snippet !== undefined}
		{@render snippet()}
	{/if}
</div>

<style lang="scss" scoped>
	.header {
		display: flex;
		margin-bottom: 30px;
		flex-direction: column;
    	align-items: start;
	}
</style>
