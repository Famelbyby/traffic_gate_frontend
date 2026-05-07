<script lang="ts">
	import { onMount } from 'svelte';
	import moon from '$lib/assets/moon.png';
	import sun from '$lib/assets/sun.png';
	import { getTheme, updateThemeCookie } from '~/helpers/theme.svelte';

	const theme = $derived(getTheme());

	onMount(() => {
		updateThemeCookie();
	});
</script>

<div class="sidebar-theme">
	<button
		type="button"
		class="sidebar-theme__value"
		onclick={() => updateThemeCookie(theme)}
		aria-label="theme">
		<img
			class={`sidebar-theme__img sidebar-theme__img_${theme}`}
			src={theme === 'dark' ? moon : sun}
			alt="theme" />
	</button>
</div>

<style lang="scss">
	.sidebar-theme__img {
		width: 20px;
		height: 20px;
		opacity: 0.5;
		transition-duration: 0.3s;

		&:hover {
			opacity: 1;
		}
	}

	.sidebar-theme__img_dark {
		filter: invert(1);
	}
</style>
