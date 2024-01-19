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
    return new ErrorResponse(HttpStatus.Unauthorized, "Wrong credentials!");
  }

  static forbidden() {
    return new ErrorResponse(HttpStatus.Forbidden, "Forbidden!");
  }

  static badRequest() {
    return new ErrorResponse(HttpStatus.BadRequest, "Bad request");
  }

  static notFound() {
    return new ErrorResponse(HttpStatus.NotFound, "Not Found!");
  }


  static duplicateEntry() {
    return new ErrorResponse(HttpStatus.DuplicateEntry, "Duplicate entry");
  }
}