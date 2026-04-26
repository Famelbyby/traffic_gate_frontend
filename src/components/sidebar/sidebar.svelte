<script lang="ts">
	import SidebarHrefs from './sidebarHrefs.svelte';
	import SidebarLogo from './sidebarLogo.svelte';
	import SidebarTheme from './sidebarTheme.svelte';
</script>

<div class="sidebar">
	<div class="sidebar-content">
		<SidebarLogo />
		<SidebarHrefs />
	</div>
	<div class="sidebar-footer">
		<SidebarTheme />
	</div>
</div>

<style lang="scss" scoped>
	.sidebar {
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		border-right: 1px solid gray;
		box-sizing: border-box;

		max-width: 220px;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		row-gap: 60px;
	}
</style>
