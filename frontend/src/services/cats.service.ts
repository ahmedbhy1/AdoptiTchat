import { HttpClient } from "../core/http-client";
import { HttpResponse } from '../core/http-response';
import { CatsResponse } from "../dtos/cats.response";

export class CatsService {
	static async getAllCats(accessToken: string): Promise<HttpResponse<CatsResponse>> {
		const response = await HttpClient.get<HttpResponse<CatsResponse>>('/cats', accessToken);
		return response.data;
	}
}
