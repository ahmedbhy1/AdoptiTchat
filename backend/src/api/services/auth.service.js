import { ErrorResponse } from "../core/ErrorResponse.js";
import { User } from "../models/User.js";
import { UserRole } from '../core/UserRole.js'
import bcrypt from 'bcryptjs';

export class AuthService {
  async login(userInput) {
		const user = await User.findOne({ email: userInput.email });
		if (!user) {
			throw ErrorResponse.notAuthorized('Wrong credentials!');
		}

		const didPasswordMatch = await bcrypt.compare(
			userInput.password,
			user.password,
		);
		if (!didPasswordMatch) {
			throw ErrorResponse.unauthorized('Wrong credentials!');
		}
		return user;
  }

  async register(userInput) {
    if (!userInput?.email || !userInput.password) {
      throw ErrorResponse.badRequest(); 
    }

		const user = await User.findOne({ email: userInput.email });
		if (user) {
			throw ErrorResponse.duplicateEntry();
		}

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userInput.password, salt);
		return User.create({ email: userInput.email, password: hashedPassword, role: UserRole.Client,tokenVersion:1 });
  }

	async incrementTokenVersion(user) {
		console.log("user=",user);
		return User.findByIdAndUpdate(user.Id, { $inc: { tokenVersion: 1 }}, { new: true });
	}
}