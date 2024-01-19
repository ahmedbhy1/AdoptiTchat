import { AuthService } from "../services/auth.service.js";
import { JwtService } from "../services/jwt.service.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { ErrorResponse } from "../core/ErrorResponse.js";

export default class AuthController {
    #authService = new AuthService();
    #jwtService = new JwtService();

    async login(req, res, next) {
      try {
        const userInput = req.body;
        const user = await this.#authService.login(userInput);
        const accessToken = this.#jwtService.getAccessToken(user);
        const refreshToken = this.#jwtService.getRefreshToken(user);
        
        res.cookie('jid', refreshToken, {
          httpOnly: true,
          path: '/api/auth/refresh-token',
        });

        res.status(HttpStatus.Ok).json({
          success: true,
          body: { accessToken: accessToken },
        });
      } catch (error) {
        next(error);
      }
    }

    async register(req, res, next) {
      try {
        const userInfo = req.body;
        if (!userInfo?.password || !userInfo.email) {
            throw ErrorResponse.badRequest();
        }

        const user = await this.#authService.register(userInfo);
        const accessToken = this.#jwtService.getAccessToken(user);
        const refreshToken = this.#jwtService.getRefreshToken(user);
        
        res.cookie('jid', refreshToken, {
          httpOnly: true,
          path: '/api/auth/refresh-token',
        });

        res.status(HttpStatus.Ok).json({
          success: true,
          body: {
            accessToken,
          },
        });
        next();
      } catch (error) {
        next(error);
      }
    }
}