<script lang="ts">
    export type Props = {
        url: string;
    }

    let {url}: Props = $props();
</script>

<div class="metric-page-header">
    <a class="metric-page-header__go-back" href="/metrics">
        Вернуться назад
    </a>
    Url: {url}
</div>

<style lang="scss" scoped>
    .metric-page-header {
        display: flex;
        flex-direction: column;
    }

    a {
        text-decoration: underline;
        color: gray;
        cursor: pointer;

        &:hover {
            color: black;
        }
    }
</style>