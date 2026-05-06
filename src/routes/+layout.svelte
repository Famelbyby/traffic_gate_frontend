<script lang="ts">
	import './layout.css';
	import './reset.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '~/components/sidebar/sidebar.svelte';
	import { getTheme } from '~/helpers/theme.svelte';

	let { children } = $props();

	let layoutTheme = $derived(getTheme());
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class={`general-layout general-layout_${layoutTheme}`}>
	<Sidebar />
	<div class="page-content">{@render children()}</div>
</div>

<style lang="scss" scoped>
	:global(body) {
		display: flex;
		height: 100vh;
		margin: 0;
		box-sizing: border-box;
		overflow: hidden;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.general-layout {
		display: flex;
		flex-grow: 1;
		background: #fcf4ea9e;
	}

	.general-layout_dark {
		background: #000034;
		color: white;
	}

	.page-content {
		display: flex;
		flex-grow: 3;
		padding: 30px 0 30px 30px;
	}
</style>
