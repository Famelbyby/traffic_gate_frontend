import type { URLPath } from '~/types/URL';

export type SidebarHref = {
	title: string;
	URLpath: URLPath;
	isActivated?: boolean;
};

export type Theme = 'dark' | 'light';
