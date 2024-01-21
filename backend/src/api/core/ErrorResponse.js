import { HttpStatus } from "./HttpStatus.js";

export class ErrorResponse extends Error {
  status;
  message;
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static unauthorized() {
    return new ErrorResponse(HttpStatus.Unauthorized, message || "Wrong credentials!");
  }

  static forbidden(message) {
    return new ErrorResponse(HttpStatus.Forbidden, message || "Forbidden!");
  }

  static badRequest(message) {
    return new ErrorResponse(HttpStatus.BadRequest, message || "Bad request");
  }

  static notFound(message) {
    return new ErrorResponse(HttpStatus.NotFound, message || "Not Found!");
  }

  static duplicateEntry(message) {
    return new ErrorResponse(HttpStatus.DuplicateEntry, message || "Duplicate entry");
  }
}