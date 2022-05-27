import { RequestHandler, Request, Response, NextFunction } from 'express'

export const errorCatcher = (handler: RequestHandler) => (
  async (...args: [Request, Response, NextFunction]) => {
    try { await handler(...args) } catch (err) { args[2](err) }
  }
)
