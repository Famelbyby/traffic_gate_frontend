<script lang="ts">
	import type { Props } from "~/types/header";

    let {title = 'Заголовок'}: Props = $props();
</script>

<div class="header">
    <span class="header__title">
        {title}
    </span>
</div>

<style lang="scss" scoped>
    .header {
        display: flex;
        margin-bottom: 60px;
    }

    .header__title {
        font-size: 20px;
    }
</style>