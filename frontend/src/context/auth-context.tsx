import {
	createContext,
	useState,
	useCallback,
	useMemo,
	useEffect,
} from 'react';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegistrationDto } from '../dtos/registration.dto';
import { useNavigate } from 'react-router-dom';

export interface AuthContextState {
  accessToken: string | null,
  error: string | null,
  isLoading: boolean,
  isLoggedIn: boolean,
  user: User | null,
  login: (loginInput: LoginDto) => Promise<void>,
  register: (userInput: RegistrationDto) => Promise<void>,
  logout: () => Promise<void>,
} 

export const AuthContext = createContext<AuthContextState | undefined>(undefined);

function getUserFromAccessToken(accessToken: string): User {
	return JSON.parse(window.atob(accessToken.split('.')[1]));
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const login = useCallback(async (loginInput: LoginDto) => {
		try {
			setIsLoading(true);
			const response = await AuthService.login(loginInput);
      if (!response.success || !response.data?.accessToken) {
				console.log(response);
        setError("Wrong credentials!");
      }
			else {
				console.log('in')
				setAccessToken(response.data!.accessToken);
				navigate('/');
			}
		} catch (error) {
			setError('Failed!');
		} finally {
			setIsLoading(false);
		}
	}, [navigate]);

	const register = useCallback(async (userInput: RegistrationDto) => {
		try {
			setIsLoading(true);
			const response = await AuthService.register(userInput);
			console.log(response);
      if (!response.success || !response.data?.accessToken) {
        setError("Wrong credentials!");
      }
			else {
				console.log('in')
				setAccessToken(response.data!.accessToken);
				navigate('/');
			}
		} catch (error) {
			setError('Unknown error');
		} finally {
			setIsLoading(false);
		}
		navigate('/');
	}, [navigate]);

	const logout = useCallback(async () => {
    try {
			setIsLoading(true);
			await AuthService.logout(accessToken ?? '');
			setAccessToken(null);
			navigate('/login');
		} catch (error) {
			setError("Error logging out!");
		} finally {
			setIsLoading(false);
		}
	}, [navigate, accessToken]);

	const refreshToken = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await AuthService.refreshToken();
			if (!response.success) {
				setAccessToken(null);
      }
			else {
				setAccessToken(response.data?.accessToken ?? null);
			}
		}
		finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			refreshToken();
		}, 10 * 60 * 1000); // every 10 mins

		return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

	const value: AuthContextState = useMemo(() => ({
		accessToken,
		user: !!accessToken && getUserFromAccessToken(accessToken) || null,
		isLoggedIn: !!accessToken,
		isLoading,
		error,
		login,
		register,
		logout,
	}), [accessToken,error, isLoading, login, register, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
