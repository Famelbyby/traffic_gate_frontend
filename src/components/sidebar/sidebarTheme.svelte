<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme } from '~/types/sidebar';
	import moon from '$lib/assets/moon.png';
	import sun from '$lib/assets/sun.png';

	let theme = $state<Theme>('light');

	function updateCookie(currentTheme: Theme) {
		switch (currentTheme) {
			case 'dark':
				document.cookie = 'theme=light';
				theme = 'light';
				break;
			case 'light':
				document.cookie = 'theme=dark';
				theme = 'dark';
		}
	}

	onMount(() => {
		theme = document.cookie.includes('dark') ? 'dark' : 'light';
	});
</script>

<div class="sidebar-theme">
	<button
		type="button"
		class="sidebar-theme__value"
		onclick={() => updateCookie(theme)}
		aria-label="theme">
		<img
			class="sidebar-theme__img"
			src={theme === 'dark' ? moon : sun}
			alt="theme" />
	</button>
</div>

<style lang="scss">
	.sidebar-theme__img {
		width: 20px;
		height: 20px;
	}
</style>
