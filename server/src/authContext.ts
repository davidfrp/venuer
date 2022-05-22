import { AuthenticationError } from 'apollo-server-core'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

type ExpressContext = {
  req: Request,
  res: Response
}

type AppContext = {
  userId?: string
}

export default ({ req }: ExpressContext): AppContext | undefined => {
  const authHeader = req.headers.authorization // Bearer <token>
  const token = authHeader?.split(' ').pop()

  if (token) {
    try {
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as AppContext

      return { userId }
    } catch (err) {
      throw new AuthenticationError('Session expired. Log in again.')
    }
  }
}
