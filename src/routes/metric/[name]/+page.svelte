<script lang="ts">
	import { METRICS_DATA_MOCK } from '~/constants/mocks';

	let { params } = $props();

	let metricData = $derived(
		METRICS_DATA_MOCK.find((metric) => metric.url === params.name),
	);

	$effect(() => {
		if (metricData === undefined) {
		}
	});
</script>

<div class="metric-page"></div>
