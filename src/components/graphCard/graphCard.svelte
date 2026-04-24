<script lang="ts">
  import { Chart } from "@flowbite-svelte-plugins/chart";
  import { Card } from "flowbite-svelte";

  let {options} = $props();
</script>

<Card>
  <Chart {options} />
</Card>