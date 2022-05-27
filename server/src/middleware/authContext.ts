import { RequestHandler } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { UnauthorizedError } from '../errors'

type User = {
  id: string
  role: number
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authContext: RequestHandler = async (req, _, next) => {
  const token = req.cookies.token
  if (token) {
    try {
      const { id, role } = verify(token, process.env.JWT_SECRET as string) as JwtPayload
      req.user = { id, role }
      return next()
    } catch (_) {
      next(new UnauthorizedError('Invalid token'))
    }
  }

  next(new UnauthorizedError('Requires authentication'))
}
