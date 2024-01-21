import { AxiosResponse } from 'axios';
import axios, { AxiosInstance } from 'axios';
import { generateAuthHeader } from '../helpers/globals';


export class HttpClient {
	private static _httpClient: AxiosInstance = axios.create({
		baseURL: 'http://localhost:3000/api/',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	static async get<T>(path: string, accessToken?: string): Promise<AxiosResponse<T>> {
		if (!accessToken) {
			return HttpClient._httpClient.get<T>(path, );
		}

		const authHeader = generateAuthHeader(accessToken);
		return HttpClient._httpClient.get<T>(path, authHeader);
	}

	static async post<T, P>(path: string, input: T, accessToken?: string): Promise<AxiosResponse<P>> {
		if (!accessToken) {
			return HttpClient._httpClient.post<P>(path, input);
		}

		const authHeader = generateAuthHeader(accessToken);
		return HttpClient._httpClient.post<P>(path, input, authHeader);
	}

	static async put<T, P>(path: string, input: T, accessToken?: string): Promise<AxiosResponse<P>> {
		if (!accessToken) {
			return HttpClient._httpClient.put<P>(path, input);
		}

		const authHeader = generateAuthHeader(accessToken);
		return HttpClient._httpClient.put<P>(path, input, authHeader);
	}

	static async patch<T, P>(path: string, input: T, accessToken?: string): Promise<AxiosResponse<P>> {
		if (!accessToken) {
			return HttpClient._httpClient.patch<P>(path, input);
		}

		const authHeader = generateAuthHeader(accessToken);
		return HttpClient._httpClient.patch<P>(path, input, authHeader);
	}

	static async delete<T>(path: string, queryParams: T, accessToken?: string): Promise<AxiosResponse> {
		if (!accessToken) {
			return HttpClient._httpClient.delete(path, { params: queryParams });
		}

		const authHeader = generateAuthHeader(accessToken);
		return HttpClient._httpClient.delete(path, { ...authHeader, params: queryParams });
	}
}
