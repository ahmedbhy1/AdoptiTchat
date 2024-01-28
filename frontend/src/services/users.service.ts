import { HttpClient } from "../core/http-client";
import { HttpResponse } from '../core/http-response';
import { AddCatToFavourite, CatResponse, CatsResponse, FavouriteCatsIdsResponse, FavouriteCatsResponse, RequestedForAdoptionResponse } from "../dtos/cats.responses.interfaces";

export class UsersService {
	static async getFavouriteCats(accessToken: string): Promise<HttpResponse<CatsResponse>> {
		const response = await HttpClient.get<HttpResponse<CatsResponse>>('/users/favouriteCats', accessToken);
		return response.data;
	}
	static async getFavouriteCatsIds(accessToken: string): Promise<HttpResponse<FavouriteCatsIdsResponse>> {
		const response = await HttpClient.get<HttpResponse<FavouriteCatsIdsResponse>>('/users/favouriteCatsIds', accessToken);
		return response.data;
	}
	static async getcheckIfFavourite(accessToken: string, catId: string): Promise<HttpResponse<FavouriteCatsResponse>> {
		const response = await HttpClient.get<HttpResponse<FavouriteCatsResponse>>(`/users/checkIfFavourite/${catId}`, accessToken);
		return response.data;
	}
	static async getcheckIfRequestedForAdoption(accessToken: string, catId: string): Promise<HttpResponse<RequestedForAdoptionResponse>> {
		const response = await HttpClient.get<HttpResponse<RequestedForAdoptionResponse>>(`/users/checkIfRequestedForAdoption/${catId}`, accessToken);
		return response.data;
	}

	static async addCatToFavourites(catId : string,accessToken?: string): Promise<HttpResponse<AddCatToFavourite>> {
		const response = await HttpClient.post<{},HttpResponse<AddCatToFavourite>>(`/users/addCatToFavourites`, {"catId":catId}, accessToken);
		return response.data;
	  }
	static async deleteCatFromFavourites(catId : string,accessToken?: string): Promise<HttpResponse<AddCatToFavourite>> {
		const response = await HttpClient.patch<{},HttpResponse<AddCatToFavourite>>(`/users/deleteCatFromFavourites`, {"catId":catId}, accessToken);
		return response.data;
	  }
	static async reqCatAdoption(catId : string,accessToken?: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.post<{},HttpResponse<CatResponse>>(`/users/requestCatAdoption`, {"catId":catId}, accessToken);
		return response.data;
	  }

	static async cancelReqCatAdoption(catId : string,accessToken?: string): Promise<HttpResponse<CatResponse>> {
		const response = await HttpClient.patch<{},HttpResponse<CatResponse>>(`/users/cancelCatAdoptionRequest`, {"catId":catId}, accessToken);
		return response.data;
	  }

}
