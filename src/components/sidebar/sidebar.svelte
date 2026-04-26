<script lang="ts">
	import SidebarHrefs from './sidebarHrefs.svelte';
	import SidebarLogo from './sidebarLogo.svelte';
</script>

<div class="sidebar">
	<SidebarLogo />
	<SidebarHrefs />
</div>

<style lang="scss" scoped>
	.sidebar {
		padding: 20px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		border-right: 1px solid gray;
		box-sizing: border-box;

		row-gap: 60px;
	}
</style>
