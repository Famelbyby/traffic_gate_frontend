<script lang="ts">
	import Header from '~/components/header/header.svelte';
	import RowStats from '~/components/rowStats/rowStats.svelte';
	import { OVERALL_STATS_MOCK } from '~/constants/mocks';
</script>

<div class="main-page">
	<Header title="Общая статистика" />
	<RowStats className="row-stats_overall" stats={OVERALL_STATS_MOCK} />
</div>

<style lang="scss" scoped>
	.main-page {
		display: flex;
		flex-direction: column;

		align-items: start;
	}

	.row-stats_overall {
		gap: 30px;
	}
</style>
