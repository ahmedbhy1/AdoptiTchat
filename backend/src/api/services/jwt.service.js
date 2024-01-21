import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";
import jwt from "jsonwebtoken";

export class JwtService {
  getAccessToken(user) {
		return jwt.sign(
			{
				id: user._id,
				role: user.role,
				email: user.email,
				tokenVersion: user.tokenVersion
			},
			jwtSecretKey,
			{
				expiresIn: "15m",
			},
		);
	}

	getRefreshToken(user) {
		return jwt.sign(
			{
				id: user._id,
				role: user.role,
				email: user.email,
			},
			refreshTokenSecretKey,
			{
				expiresIn: "7d",
			},
		);
	}
}