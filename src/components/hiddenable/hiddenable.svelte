<script lang="ts">
	import type { Props } from '~/types/hiddenable';

	let { children, visibilityCondition }: Props = $props();

	const isVisible = $derived(visibilityCondition());
</script>

<div
	class={{
		'visibility-wrapper': true,
		'visibility-wrapper_hidden': !isVisible,
	}}>
	{@render children()}
</div>

<style lang="scss" scoped>
	.visibility-wrapper {
		visibility: visible;
	}

	.visibility-wrapper_hidden {
		visibility: hidden;

		max-width: 0px;
		max-height: 0px;
	}
</style>
