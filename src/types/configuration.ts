export type ConfigurationWay = 'text' | 'settings';
export type Configuration = string;

export type ConfigurationWays = {
	selectedWay: ConfigurationWay;
	onClick: (way: ConfigurationWay) => void;
};

export type ConfigurationSettingsKeys =
	| 'preSymbol'
	| 'postSymbol'
	| 'preComplexSymbol'
	| 'indent'
	| 'postComplexSymbol'
	| 'divisionSymbol';
export type ConfigurationSettings = Record<
	ConfigurationSettingsKeys,
	string | number
>;
