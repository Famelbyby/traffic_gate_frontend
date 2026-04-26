<script lang="ts">
	import { page } from "$app/state";
	import { SIDEBAR_HREFS } from "~/constants/sidebar";
	import type { SidebarHref } from "~/types/sidebar";

    let currentHrefs = $state<SidebarHref[]>(SIDEBAR_HREFS);

    $effect(() => {
        const currentPath = page.url.pathname;

        currentHrefs.forEach((current) => current.isActivated = currentPath === current.URLpath);
    });
</script>

<div class="sidebar-hrefs">
    {#each currentHrefs as href(href.title)}
        <div class="sidebar-href">
            <a href={href.URLpath} class={href.isActivated ? 'sidebar-href__activated' : ''}>{href.title}</a>
        </div>
    {/each}
</div>

<style lang="scss">
    .sidebar-href {
        position: relative;
    }

    .sidebar-href__activated::after {
        position: absolute;
        content: "";
        left: 0;
        width: 100%;
        bottom: 0;
        border: 1px solid black;
    }

    .sidebar-hrefs {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        align-items: start;
    }
</style>