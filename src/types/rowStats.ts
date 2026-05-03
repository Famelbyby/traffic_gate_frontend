import type { Props as CellStatProps } from '~/types/cellStat';

export type Props = {
	stats: CellStatProps[];
	className?: string;
	pending?: boolean;
	isMetricPage?: boolean;
};
