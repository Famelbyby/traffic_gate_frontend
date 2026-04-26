import { generateOverallMocks } from '~/helpers/generateOverallMocks';
import AxiosClient from '../AxiosClient';
import type { Props } from '~/types/cellStat';

const generator = generateOverallMocks();

export async function getOverallStats() {
	const result = await AxiosClient.get<Props[]>('/overall');

	if (result.error !== undefined) {
		return generator();
	}

	return result.data!;
}
