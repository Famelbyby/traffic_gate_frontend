import type { CreateMetric } from "./metric";

export type Props = {
	closeModal: () => void;
	addMetric: (data: CreateMetric) => void;
};
