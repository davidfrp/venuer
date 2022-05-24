import { Router } from 'express'
import { User } from '../models/user.model'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const router = Router()

router.post('/register', async (req, res) => {
  let { name, email, password } = req.body

  name = name.trim()
  email = email.trim().toLowerCase()

  const isEmailAvailable = !await User.findOne({ email })

  if (!isEmailAvailable) {
    // 400 Bad Request, as the request is malformed.
    return res.status(400).send({
      message: 'Email already registered.',
      code: 'EMAIL_ALREADY_REGISTERED'
    })
  }

  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(password)

  if (!isPasswordValid) {
    // 400 Bad Request, as the request is malformed.
    return res.status(400).send({
      message: 'Password is too weak.',
      code: 'PASSWORD_TOO_WEAK'
    })
  }

  // All password data gets encrypted at the model middleware.
  const user = new User({ name, email, password })

  await user.save()

  // 307 Temporary Redirect, preserves request method and body.
  return res.redirect(307, `${req.baseUrl}/login`)
})

router.post('/login', async (req, res) => {
  let { email, password } = req.body

  email = email.trim().toLowerCase()

  const user = await User.findOne({ email }).select('+password')

  if (user) {
    const isPasswordValid = await compare(password, user.password)

    if (isPasswordValid) {
      const token = sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      )
      return res.send({ token })
    }
  }

  // 401 Unauthorized, as the request wasn't malformed.
  res.status(401).send({
    message: 'Wrong email or password.',
    code: 'WRONG_EMAIL_OR_PASSWORD'
  })
})

export default router
