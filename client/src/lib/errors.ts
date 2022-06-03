export class NotFoundError extends Error {
  constructor (message?: string) {
    if (!message) {
      message = 'The page, you were looking for, could not be found.'
    }
    super(message)
  }
}
