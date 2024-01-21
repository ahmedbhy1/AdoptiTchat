import { HttpClient } from "../core/http-client";
import { RegistrationDto } from "../dtos/registration.dto";
import { LoginDto } from '../dtos/login.dto';
import { LoginResponse } from "../dtos/login.response";
import { HttpResponse } from '../core/http-response';

export class AuthService {
	static async login(loginInput: LoginDto): Promise<HttpResponse<LoginResponse>> {
		const response = await HttpClient.post<LoginDto, HttpResponse<LoginResponse>>('/auth/login', loginInput);
		return response.data;
	}

	static async register(userInput: RegistrationDto): Promise<HttpResponse<LoginResponse>> {
		const { data } = await HttpClient.post<RegistrationDto, HttpResponse<LoginResponse>>('/auth/register', userInput);
		return data;
	}

	static async logout(accessToken: string): Promise<void> {
		await HttpClient.post('/auth/logout', {}, accessToken);
	}

	static async refreshToken(): Promise<HttpResponse<LoginResponse>> {
		const { data } = await HttpClient.post<unknown, HttpResponse<LoginResponse>>('/auth/refresh-token', {});
		return data;
	}
}
