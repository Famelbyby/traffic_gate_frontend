<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '~/components/sidebar/sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="general-layout">
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
		background-color: #fcf4ea9e;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.general-layout {
		display: flex;
		flex-grow: 1;
	}

	.page-content {
		display: flex;
		flex-grow: 3;
		padding: 30px 0 30px 30px;
	}
</style>
