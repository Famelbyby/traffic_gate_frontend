import type { Props as CellStatProps } from '~/types/cellStat';

export const OVERALL_STATS_MOCK: CellStatProps[] = [
	{
		title: 'CPU, %',
		value: 20,
	},
	{
		title: 'Время работы',
		value: Date.now(),
	},
	{
		title: 'RAM, Gb',
		value: '0.460',
	},
	{
		title: 'Количество запросов',
		value: 237,
	},
	{
		title: 'Ошибки, %',
		value: '0.06',
	},
	{
		title: 'RPS',
		value: '1783',
	},
];

export const RESULT_SETTINGS_MOCK = 'listener preComplexKey\n\tpreKey addressdivision "127.0.0.1:8080"postKey\n\tpreKey max_connectionsdivision 1000postKey\n\tpreKey idle_timeout_msdivision 30000postKey\npostComplexKey\n\nadmin preComplexKey\n\tpreKey enableddivision truepostKey\n\tpreKey addressdivision "127.0.0.1:9090"postKey\npostComplexKey\n\nlogging preComplexKey\n\tpreKey leveldivision infopostKey\n\tpreKey access_log_enableddivision truepostKey\npostComplexKey\n\nmetrics preComplexKey\n\tpreKey enableddivision truepostKey\npostComplexKey\n\nroutes preComplexKey\n\tpreKey some_route preComplexKey\n\t\tpreKey upstream_namedivision "api"postKey\n\t\tpreKey path_prefixdivision "/"postKey\n\tpostComplexKey\n\tpreKey another_route preComplexKey\n\t\tpreKey upstream_namedivision "apiv2"postKey\n\t\tpreKey path_prefixdivision "/v2/"postKey\n\tpostComplexKey\npostComplexKey\n\nupstreams preComplexKey\n\tpreKey api preComplexKey\n\t\tpreKey strategydivision weighted_round_robinpostKey\n\t\tpreKey connect_timeout_msdivision 1000postKey\n\t\tpreKey health_check preComplexKey\n\t\t\tpreKey enableddivision truepostKey\n\t\t\tpreKey kinddivision httppostKey\n\t\t\tpreKey pathdivision "/health"postKey\n\t\t\tpreKey health_thresholddivision 2postKey\n\t\tpostComplexKey\n\t\tpreKey backends preComplexKey\n\t\t\tpreKey first_backend preComplexKey\n\t\t\t\tpreKey weightdivision 1000postKey\n\t\t\t\tpreKey addressdivision "127.0.0.19091"postKey\n\t\t\tpostComplexKey\n\t\tpostComplexKey\n\tpostComplexKey\npostComplexKey';