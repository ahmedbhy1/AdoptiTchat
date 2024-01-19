import { config } from 'dotenv';
config();

export const { DB_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY  } = process.env;
export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const apiPrefix = '/api';