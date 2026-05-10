export type ConfigurationWay = 'text' | 'block';
export type Configuration = string;

export type ConfigurationWays = {
	selectedWay: ConfigurationWay;
	onClick: (way: ConfigurationWay) => void;
};
