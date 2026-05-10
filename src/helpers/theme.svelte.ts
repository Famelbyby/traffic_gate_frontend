import type { Theme } from '~/types/sidebar';
import { findCookie } from './findCookie';

let theme = $state<Theme>('light');

export function getTheme() {
	return theme;
}

export function updateThemeCookie(currentTheme?: Theme) {
	const cookieTheme = findCookie('theme');

	switch (currentTheme) {
		case undefined:
			theme = cookieTheme?.includes('dark') ? 'dark' : 'light';
			break;
		case 'dark':
			document.cookie = 'theme=light';
			theme = 'light';
			break;
		case 'light':
			document.cookie = 'theme=dark';
			theme = 'dark';
	}
}
