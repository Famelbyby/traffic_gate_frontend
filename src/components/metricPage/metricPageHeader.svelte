<script lang="ts">
	import { getTheme } from "~/helpers/theme.svelte";
	import type {MetricPageHeader as Props} from '~/types/metricPage';

	let { url }: Props = $props();

	let theme = $derived(getTheme());
</script>

<div class="metric-page-header">
	<a class={`metric-page-header__go-back metric-page-header__go-back_${theme}`} href="/metrics"> Вернуться назад </a>
	Url: {url}
</div>

<style lang="scss" scoped>
	.metric-page-header {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	.metric-page-header__go-back {
		text-decoration: underline;
		color: gray;
		cursor: pointer;
		transition-duration: 0.3s;

		&:hover {
			color: black;
		}
	}

	.metric-page-header__go-back_dark {
		&:hover {
			color: white;
		}
	}
</style>
