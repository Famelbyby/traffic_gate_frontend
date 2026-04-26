import type { ConfigurationWay } from '~/types/configuration';

export const CONFIGURATION_WAYS: ConfigurationWay[] = ['text', 'block'];

export const CONFIGURATION_TRANSLATION: Record<ConfigurationWay, string> = {
	text: 'Текстом',
	block: 'Блоками',
};
