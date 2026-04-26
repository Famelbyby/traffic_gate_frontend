import axios from 'axios';
import { API_URL } from '~/constants/URL';
import type { AxiosMethod, OwnAxiosResponse } from '~/types/axiosClient';

class AxiosClient {
	private baseUrl: string;

	constructor(url: string) {
		this.baseUrl = url;
	}

	async request<T, G = unknown>(method: AxiosMethod, url: string, data?: G) {
		try {
			switch (method) {
				case 'get':
					return (await axios.get(
						this.baseUrl + url,
					)) as OwnAxiosResponse<T>;
				case 'post':
					return (await axios.post(this.baseUrl + url, data, {
						withCredentials: true,
					})) as OwnAxiosResponse<T>;
			}
		} catch (error) {
			return <OwnAxiosResponse>{
				error,
			};
		}
	}

	get<T>(url: string) {
		return this.request<T>('get', url);
	}

	post<T, G>(url: string, data: G) {
		return this.request<T, G>('post', url, data);
	}
}

export default new AxiosClient(API_URL);
