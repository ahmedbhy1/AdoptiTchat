import { refreshTokenSecretKey } from "../../config/index.js";
import { ErrorResponse } from "../core/ErrorResponse.js";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export async function verifyRefreshToken(req, _res, next) {
  try {
    const refreshToken = req.cookies?.jid;
    if (!refreshToken) {
      throw ErrorResponse.unauthorized();
    }
    const payload = jwt.verify(
      refreshToken,
      refreshTokenSecretKey,
    );
    const user = await User.findOne({
      id: payload?.id,
      tokenVersion: payload?.tokenVersion,
    });

    if (!user) {
      throw ErrorResponse.unauthorized();
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}