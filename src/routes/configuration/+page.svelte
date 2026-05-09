<script lang="ts">
	import BlockConfiguration from '~/components/configuration/blockConfiguration.svelte';
	import ConfigurationWays from '~/components/configuration/configurationWays.svelte';
	import TextConfiguration from '~/components/configuration/textConfiguration.svelte';
	import Header from '~/components/header/header.svelte';
	import Hiddenable from '~/components/hiddenable/hiddenable.svelte';
	import type { ConfigurationWay } from '~/types/configuration';

	let currentWay = $state<ConfigurationWay>('text');

	function catchWayClick(way: ConfigurationWay) {
		currentWay = way;
	}
</script>

<div class="configuration-page">
	<Header title="Конфигурация" />
	<ConfigurationWays selectedWay={currentWay} onClick={catchWayClick} />
	<Hiddenable visibilityCondition={() => currentWay === 'text'}>
		<TextConfiguration />
	</Hiddenable>
	<Hiddenable visibilityCondition={() => currentWay === 'block'}>
		<BlockConfiguration />
	</Hiddenable>
</div>

<style lang="scss" scoped>
	.configuration-page {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-right: 30px;
	}
</style>
