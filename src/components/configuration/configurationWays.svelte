<script lang="ts">
	import { CONFIGURATION_TRANSLATION, CONFIGURATION_WAYS } from "~/constants/configuration";
	import type { ConfigurationWay } from "~/types/configuration";

    export type Props = {
        onClick: (way: ConfigurationWay) => void;
    }

    let {onClick}: Props = $props();
</script>

<div class="configuration-ways">
    {#each CONFIGURATION_WAYS as way (way)}
        <button type="button" class="configuration-ways__item" onclick={() => onClick(way)} tabindex="0">
            {CONFIGURATION_TRANSLATION[way]}
        </button>
    {/each}
</div>

<style lang="scss" scoped>
    .configuration-ways {
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    .configuration-ways__item {
        border-radius: 7px;
        border: 1xp solid gray;
        padding: 5px 8px;
    }
</style>