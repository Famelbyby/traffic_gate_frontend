<script lang="ts">
	import type { Props } from '~/types/header';

	let { title = 'Заголовок' }: Props = $props();
</script>

<div class="header">
	<h2 class="header__title">
		{title}
	</h2>
</div>

<style lang="scss" scoped>
	.header {
		display: flex;
		margin-bottom: 30px;
	}
</style>
