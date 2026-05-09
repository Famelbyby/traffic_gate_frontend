<script lang="ts">
	import { getTheme } from '~/helpers/theme.svelte';

	let theme = $derived(getTheme());
</script>

<div class={`sidebar-logo sidebar-logo_${theme}`}>TrafficGate</div>

<style lang="scss" scoped>
	.sidebar-logo {
		font-size: 28px;
		color: #715a27;
		user-select: none;
	}

	.sidebar-logo_dark {
		color: #7982ff;
	}
</style>
