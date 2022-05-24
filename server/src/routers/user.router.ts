import { Router } from 'express'
import { authContext } from '../middleware/authContext'
import { User } from '../models/user.model'
import { isValidObjectId } from 'mongoose'

const router = Router()

router.get('/@me', authContext, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Requires authentication.' })
  }

  const user = await User.findById(req.user?.id)
  if (!user) {
    return res.status(404).send({ message: 'User not found.' })
  }

  return res.send(user)
})

router.get('/', async (_, res) => {
  const users = await User.find()
  return res.send(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (isValidObjectId(id)) {
    const user = await User.findById(id)
    if (user) {
      return res.send(user)
    }
  }

  return res.status(404).send({ message: 'User not found.' })
})

export default router
