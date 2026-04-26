<script lang="ts">
	import { getOverallStats } from '~/api/mainPage/main';
	import Header from '~/components/header/header.svelte';
	import RowStats from '~/components/rowStats/rowStats.svelte';
	import { UPDATE_INTERVAL } from '~/constants/main';
	import { OVERALL_STATS_MOCK } from '~/constants/mocks';

	let stats = $state(OVERALL_STATS_MOCK);

	$effect(() => {
		setInterval(async () => {
			stats = await getOverallStats();
		}, UPDATE_INTERVAL);
	});
</script>

<div class="main-page">
	<Header title="Общая статистика" />
	<RowStats className="row-stats_overall" {stats} />
</div>

<style lang="scss" scoped>
	.main-page {
		display: flex;
		flex-direction: column;

		align-items: start;
		flex-grow: 1;
	}

	.row-stats_overall {
		gap: 30px;
	}
</style>
