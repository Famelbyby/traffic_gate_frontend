import type { URLPath } from "~/constants/URL";

export type SidebarHref = {
    title: string;
    URLpath: URLPath;
    isActivated?: boolean;
}

export type Theme = 'dark' | 'light';