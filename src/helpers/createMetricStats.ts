import { DEFAULT_WORK_TIME_TITLE, METRIC_STAT_TITLES } from "~/constants/metric";
import type { Metric } from "~/types/metric";
import type {Props as CellStat} from '~/types/cellStat';
import { getPercentile } from "./getPercentile";

export function createMetricStats(metricData: Metric) {
    const values = metricData.graphData.map((point) => point.value).sort((a, b) => a - b);
    let sum = 0;

    values.forEach((value) => {
        sum += value;
    });

    const result: CellStat[] = [];

    Object.entries(METRIC_STAT_TITLES).forEach(([k, v]) => {
        const cell: CellStat = {title: v, value: 0};

        switch(k) {
            case '99p':
                cell.value = getPercentile(values, 99);
                break;
            case '50p':
                cell.value = getPercentile(values, 50);
                break;
            case "max":
                cell.value = values.at(-1) || 0;
                break;
            case "min":
                cell.value = values[0] || 0;
                break;
            case "avg":
                cell.value = (sum / values.length).toFixed(2);
                break;
            case "time":
                cell.value = metricData.workTime || DEFAULT_WORK_TIME_TITLE;
                break;
        }

        result.push(cell);
    });

    return result;
}