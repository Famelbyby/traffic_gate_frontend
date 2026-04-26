import type { Snippet } from 'svelte';

export type Props = {
	visibilityCondition: () => boolean;
	children: Snippet<[]>;
};
