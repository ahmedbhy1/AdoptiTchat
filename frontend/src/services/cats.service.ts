import { HttpClient } from "../core/http-client";
import { HttpResponse } from '../core/http-response';
import { CatResponse, CatTOAdd, CatsResponse, UsersResponse } from "../dtos/cats.responses.interfaces";

export class CatsService {
	static async getAllCats(accessToken: string, searchNameParam:string): Promise<HttpResponse<CatsResponse>> {
		const response = await HttpClient.get<HttpResponse<CatsResponse>>(`/cats?name=${searchNameParam}`, accessToken);
		return response.data;
	}
	static async getCatById(accessToken: string, catId: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.get<HttpResponse<CatResponse>>(`/cats/${catId}`, accessToken);
		return response.data;
	}
	static async deleteCat(catId: string,accessToken?: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.delete<HttpResponse<CatResponse>>(`/cats/${catId}`, {
			success: false
		}, accessToken);
		return response.data;
	}
	static async addCat(cat: CatTOAdd,accessToken?: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.post<CatTOAdd,HttpResponse<CatResponse>>(`/cats`, cat, accessToken);
		return response.data;
	  }
	static async editCat(catId : string,cat: CatTOAdd,accessToken?: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.put<CatTOAdd,HttpResponse<CatResponse>>(`/cats/${catId}`, cat, accessToken);
		return response.data;
	  }
	  
	static async getUsersRequestAdoptionCat(catId : string,accessToken?: string): Promise<HttpResponse<UsersResponse>> {
		const response = await HttpClient.get<HttpResponse<UsersResponse>>(`/cats/usersRequestAdoptionCat/${catId}`, accessToken);
		return response.data;
	}

	static async approveAdoptionRequest(catId : string,accessToken?: string): Promise<HttpResponse<boolean>> {
		const response = await HttpClient.post<{},HttpResponse<boolean>>(`/cats/approveAdoption`, {"catId":catId}, accessToken);
		return response.data;
	  }
}
