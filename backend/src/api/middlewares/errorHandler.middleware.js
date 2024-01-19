import { HttpStatus } from "../core/HttpStatus.js";
import { ErrorResponse } from "../core/ErrorResponse.js";

export const errorHandler = (err, _req, res, _next) => {
	console.log(err);
	if (err instanceof ErrorResponse) {
		return res
			.status(err.status)
			.json({ success: false, error: err.message });
	}

	return res
		.status(HttpStatus.InternalServerError)
		.json({ success: false, error: 'Internal server error' });
};
