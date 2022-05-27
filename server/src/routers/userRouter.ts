import { Router } from 'express'
import { isValidObjectId } from 'mongoose'
import { NotFoundError, UnauthorizedError } from '../errors'
import { authContext } from '../middleware/authContext'
import { User } from '../models/userModel'
import { errorCatcher } from '../utils'
import { validate, updateUserSchema } from '../validation/validator'

const router = Router()

router.get('/@me', authContext, errorCatcher(async (req, res) => {
  const user = await User.findById(req.user!.id)
  return res.send(user)
}))

router.get('/', errorCatcher(async (_, res) => {
  const users = await User.find()
  return res.send(users)
}))

router.get('/:id', errorCatcher(async (req, res) => {
  const { id } = req.params

  if (isValidObjectId(id)) {
    const user = await User.findById(id)
    if (user) {
      return res.send(user)
    }
  }

  throw new NotFoundError()
}))

router.patch('/:id', authContext, errorCatcher(async (req, res) => {
  const {
    password: currentPassword,
    newPassword: password,
    ...rest
  } = validate(updateUserSchema, req.body)

  const user = await User.findById(req.user!.id)
  if (!user || !(await user.matchesPassword(currentPassword))) {
    throw new UnauthorizedError('Wrong password')
  }

  user.set({ ...rest, password: password ?? currentPassword })
  await user.save()

  return res.send(user)
}))

// router.patch('/:id', authContext, errorCatcher(async (req, res) => {
//   const { id } = req.params

//   if (isValidObjectId(id)) {
//     const user = await User.findById(id)
//     if (user) {
//       const { name, email, password } = req.body
//       if (name) {
//         user.name = name
//       }
//       if (email) {
//         user.email = email
//       }
//       if (password) {
//         user.password = password
//       }
//       await user.save()
//       return res.send(user)
//     }
//   }

//   throw new NotFoundError()
// }))

export default router
