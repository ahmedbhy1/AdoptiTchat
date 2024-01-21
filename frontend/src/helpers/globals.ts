import { AxiosRequestConfig } from "axios";

export function generateAuthHeader(accessToken: string): AxiosRequestConfig {
	return {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
}
