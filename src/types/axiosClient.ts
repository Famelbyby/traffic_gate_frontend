import type { AxiosError } from 'axios';

export type AxiosMethod = 'get' | 'post';

export type OwnAxiosResponse<T = undefined> = {
	status: number;
	data?: T;
	error?: AxiosError;
};
