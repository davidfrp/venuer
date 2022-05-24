import { RequestHandler } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

export const authContext: RequestHandler = async (req, _, next) => {
  const authHeader = req.headers.authorization // Bearer <token>
  const token = authHeader?.split(' ').pop()

  if (token) {
    try {
      const { id, role } = verify(token, process.env.JWT_SECRET as string) as JwtPayload
      req.user = { id, role }
    } catch (_) {
      // Do nothing
    }
  }

  next()
}
