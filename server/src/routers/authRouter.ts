import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import { errorCatcher } from '../utils'
import { User } from '../models/userModel'
import { UnauthorizedError, BadRequestError } from '../errors'
import { registerSchema, loginSchema, forgotSchema } from '../joi/authValidation'
import { validate } from '../joi/validator'

const router = Router()

router.post('/register', errorCatcher(async (req, res) => {
  const { name, email, password } = validate(req.body, registerSchema)

  const isEmailTaken = await User.exists({ email })

  if (isEmailTaken) {
    throw new BadRequestError('Email already registered')
  }

  const user = new User({
    name,
    email,
    password,
    lastPasswordChangedAt: new Date(),
    lastLoginAt: new Date()
  })

  await user.save()

  // 307 Temporary Redirect, preserves request method and body.
  return res.redirect(307, `${req.baseUrl}/login`)
}))

router.post('/login', errorCatcher(async (req, res) => {
  const { email, password } = validate(req.body, loginSchema)

  const user = await User.findOne({ email })

  if (!user || !(await user.matchesPassword(password as string))) {
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

  user.set({ lastLoginAt: new Date() })

  return res.sendStatus(204)
}))

router.post('/logout', errorCatcher(async (_, res) => {
  res.clearCookie('token')
  return res.sendStatus(204)
}))

router.post('/forgot', errorCatcher(async (req, res) => {
  const { email } = validate(req.body, forgotSchema)

  const user = await User.findOne({ email })

  if (!user) {
    throw new BadRequestError('Email not registered')
  }

  // TODO Send email with link to reset password
  user.sendPasswordReset()

  return res.sendStatus(204)
}))

// TODO Implement password reset
// router.post('/reset', errorCatcher(async (req, res) => {
//   const { password, token } = validate(req.body, forgotSchema)
// }))

export default router
