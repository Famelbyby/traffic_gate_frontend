<script lang="ts">
	import { getOverallStats } from '~/api/mainPage/main';
	import Header from '~/components/header/header.svelte';
	import RowStats from '~/components/rowStats/rowStats.svelte';
	import { UPDATE_INTERVAL } from '~/constants/main';
	import { OVERALL_STATS_MOCK } from '~/constants/mocks';

	let stats = $state(OVERALL_STATS_MOCK);
	let pending = $state(true);

	$effect(() => {
		const intervalId = setInterval(async () => {
			stats = await getOverallStats();
			pending = false;
		}, UPDATE_INTERVAL);

		return () => {
			clearInterval(intervalId);
		}
	});
</script>

<div class="main-page">
	<Header title="Общая статистика" />
	<RowStats className="row-stats_overall" {stats} {pending} />
</div>

<style lang="scss" scoped>
	.main-page {
		display: flex;
		flex-direction: column;

		align-items: start;
		flex-grow: 1;
		padding-right: 30px;
	}

	.row-stats_overall {
		gap: 30px;
	}
</style>
