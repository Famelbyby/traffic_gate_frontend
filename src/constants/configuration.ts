import type {
	ConfigurationSettings,
	ConfigurationWay,
} from '~/types/configuration';

export const CONFIGURATION_WAYS: ConfigurationWay[] = ['text', 'settings'];

export const CONFIGURATION_TRANSLATION: Record<ConfigurationWay, string> = {
	text: 'Текст конфигурации',
	settings: 'Настройки конфигурации',
};

export const INITIAL_CONFIGURATION_SETTINGS: ConfigurationSettings = {
	postSymbol: ',',
	preSymbol: '-',
	preComplexSymbol: '{',
	postComplexSymbol: '}',
	indent: 1,
	divisionSymbol: ':',
};
