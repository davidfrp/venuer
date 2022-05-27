export abstract class HttpError extends Error {
  public status!: number
}

export class UnauthorizedError extends HttpError {
  constructor (message?: string) {
    super(message ?? 'Unauthorized')
    this.status = 401
  }
}

export class NotFoundError extends HttpError {
  constructor (message?: string) {
    super(message ?? 'Not found')
    this.status = 404
  }
}

export class BadRequestError extends HttpError {
  constructor (message?: string) {
    super(message ?? 'Bad request')
    this.status = 400
  }
}
