import { ErrorResponse } from "../core/ErrorResponse.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { User } from "../models/User.js";

export default class UserController {
  async getUser(req, res, next) {
    try {
      if (!req.params?.email) {
        throw ErrorResponse.badRequest();
      }

      const user = await User.findOne({ email: req.params.email }, { password: 0 });
      if (!user) {
        throw new ErrorResponse.notFound();
      }

      res.status(HttpStatus.Ok).json({
        data: {
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}