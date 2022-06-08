import { Router } from 'express'
import { isValidObjectId } from 'mongoose'
import { NotFoundError, UnauthorizedError } from '../errors'
import { authContext } from '../middleware/authContext'
import { User } from '../models/userModel'
import { Venue } from '../models/venueModel'
import { errorCatcher } from '../utils'
import { updateUserSchema } from '../joi/userValidation'
import { validate } from '../joi/validator'

const router = Router()

router.get('/@me', authContext, errorCatcher(async (req, res) => {
  const user = await User.findById(req.user!.id)
  return res.send(user)
}))

router.get('/@me/venues', authContext, errorCatcher(async (req, res) => {
  if (req.user!.role < 1) {
    throw new NotFoundError()
  }
  const venues = await Venue.find({ organizer: req.user!.id })
  return res.send(venues)
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
    newPassword,
    ...rest
  } = validate(req.body, updateUserSchema)

  const user = await User.findById(req.user!.id)
  if (!user || !(await user.matchesPassword(currentPassword as string))) {
    throw new UnauthorizedError('Wrong password')
  }

  user.set({ ...rest })
  if (newPassword) {
    user.set({ password: newPassword })
  }
  await user.save()

  return res.send(user)
}))

export default router
