<script lang="ts">
	import { SIDEBAR_HREFS } from "~/constants/sidebar";
</script>

<div class="sidebar-hrefs">
    {#each SIDEBAR_HREFS as href(href.title)}
        <a href={href.URLpath}>{href.title}</a>
    {/each}
</div>

<style lang="scss">
    .sidebar-hrefs {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
</style>