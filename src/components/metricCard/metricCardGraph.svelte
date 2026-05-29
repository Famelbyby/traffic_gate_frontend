<script lang="ts">
	import type { Props } from '~/types/metricCard';
	import { generateApexOptions } from '~/helpers/generateApexOptions';
	import GraphCard from '../graphCard/graphCard.svelte';
	import { FormatTimestamp } from '~/helpers/formats';
	import type { GraphLine } from '~/types/metric';

	let { graphsData }: Props = $props();

	let graphLines: GraphLine<number>[] = $derived(graphsData.map(({points, url}) => (
		{
			graphValues: points.map((graphPoint) => graphPoint.value),
			url,
		}
	)));
	let graphTimes = $derived(
		graphsData[0].points.map((graphPoint) => FormatTimestamp(graphPoint.time)),
	);

	let options = $derived(
		generateApexOptions<number>(graphLines, graphTimes),
	);
</script>

<GraphCard {options} />
