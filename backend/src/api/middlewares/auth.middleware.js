import { jwtSecretKey } from "../../config/index.js";
import { ErrorResponse } from "../core/ErrorResponse.js";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export function authenticate(role) {
  return async (req, _res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw ErrorResponse.unauthorized();
      }

      const [_, accessToken] = authHeader.split('Bearer ');
      const payload = jwt.verify(
        accessToken,
        jwtSecretKey);

      const user = await User.findById(payload?.id, { password: 0 });
      if (!user) {
        throw ErrorResponse.unauthorized();
      }

      if (!!role && user.role !== role) {
        throw ErrorResponse.forbidden();
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}