import type { Metric } from "~/types/metric";
import { generateGraphData } from "./generateGraphData";

let METRICS_DATA_MOCK = $state<Metric[]>([
    {
        id: 0,
        title: 'Bucket',
        graphData: generateGraphData(),
        url: '/bucket',
        type: 'RPS',
    },
    {
        id: 1,
        title: 'Orders',
        graphData: generateGraphData(),
        url: '/orders',
        type: 'CPU',
    },
    {
        id: 2,
        title: 'Moderation',
        graphData: generateGraphData(),
        url: '/moderation',
        type: 'RAM',
    },
]);

export function setMetricsDataMock(nextData: Metric[]) {
    METRICS_DATA_MOCK = nextData;
}

export function getMetricsDataMock() {
    return METRICS_DATA_MOCK;
}