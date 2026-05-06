<script lang="ts">
	import type { MetricPageGraph } from '~/types/metricPage';
	import { generateApexOptions } from '~/helpers/generateApexOptions';
	import GraphCard from '../graphCard/graphCard.svelte';

	let { graphData, url, width, height }: MetricPageGraph = $props();

	let graphValues = $derived(graphData.map((graphPoint) => graphPoint.value));
	let graphTimes = $derived(graphData.map((graphPoint) => graphPoint.time));

	let options = $derived(
		generateApexOptions<number>(
			url,
			graphValues,
			graphTimes,
			height,
			width,
		),
	);
</script>

<GraphCard {options} />
