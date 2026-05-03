import AxiosClient from '../AxiosClient';
import type { Metric } from '~/types/metric';
import { generateMetricsMocks } from '~/helpers/generateMetricsMocks';

const generator = generateMetricsMocks();

export async function getMetrics() {
    const result = await AxiosClient.get<Metric[]>('/metrics');

    if (result.error !== undefined) {
        return generator();
    }

    return result.data!;
}
