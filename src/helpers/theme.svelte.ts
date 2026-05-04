import type { Theme } from "~/types/sidebar";

let theme = $state<Theme>('light');

export function getTheme() {
    return theme;
}

export function updateCookie(currentTheme?: Theme) {
    switch (currentTheme) {
        case undefined:
            theme = document.cookie.includes('dark') ? 'dark' : 'light';
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