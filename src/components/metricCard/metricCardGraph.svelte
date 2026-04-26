<script lang="ts">
	import type { Props } from '~/types/metricCard';
	import { generateApexOptions } from '~/helpers/generateApexOptions';
	import GraphCard from '../graphCard/graphCard.svelte';

	let { graphData, url }: Props = $props();

	let graphValues = $derived(graphData.map((graphPoint) => graphPoint.value));
	let graphTimes = $derived(graphData.map((graphPoint) => graphPoint.time));

	let options = $derived(
		generateApexOptions<number>(url, graphValues, graphTimes, 400, 600),
	);
</script>

<GraphCard {options} />
