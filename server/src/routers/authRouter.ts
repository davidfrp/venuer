import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import { errorCatcher } from '../utils'
import { User, UserDocument } from '../models/userModel'
import { UnauthorizedError, BadRequestError } from '../errors'
import { validate, registerSchema } from '../validation/validator'

const router = Router()

router.post('/register', errorCatcher(async (req, res) => {
  const { name, email, password } = validate(registerSchema, req.body)

  const isEmailTaken = await User.exists({ email })

  if (isEmailTaken) {
    throw new BadRequestError('Email already registered')
  }

  const user = new User({ name, email, password })
  await user.save()

  // 307 Temporary Redirect, preserves request method and body.
  return res.redirect(307, `${req.baseUrl}/login`)
}))

router.post('/login', errorCatcher(async (req, res) => {
  let { email, password } = req.body

  email = email.trim().toLowerCase()

  const user: UserDocument | null = await User.findOne({ email })

  if (!user || !(await user.matchesPassword(password))) {
    throw new UnauthorizedError('Wrong email or password')
  }

  const token = sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  )

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === 'production'
  })

  return res.sendStatus(204)
}))

router.post('/logout', errorCatcher(async (req, res) => {
  res.clearCookie('token')
  return res.sendStatus(204)
}))

export default router
