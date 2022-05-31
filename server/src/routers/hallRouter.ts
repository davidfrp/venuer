import { Router } from 'express'
import { errorCatcher } from '../utils'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { validate, validObjectIdSchema } from '../joi/validator'
import { authContext } from '../middleware/authContext'
import { Venue } from '../models/venueModel'
import { Hall } from '../models/hallModel'
import { createHallSchema } from '../joi/hallValidation'
import seatRouter from './seatRouter'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const venue = await Venue.findById(req.params.venueId)
  if (!venue) {
    throw new NotFoundError()
  }
  const halls = await Hall.find({ venue: venue._id })
  return res.send(halls)
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const {
    venue: venueId, name, description, blocks
  } = validate({ venue: req.params.venueId, ...req.body }, createHallSchema)

  const venue = await Venue.findById(venueId)
  if (!venue) {
    throw new NotFoundError()
  }

  if (venue.owner.toString() !== req.user!.id) {
    throw new ForbiddenError()
  }

  const isNameTaken = await Hall.findOne({ name, venue: venue._id })
  if (isNameTaken) {
    throw new BadRequestError('\'name\' is already taken')
  }

  const hall = new Hall({
    name,
    description,
    venue,
    blocks
  })

  await hall.save()
  return res.status(201).send(hall)
}))

router.delete('/:id', authContext, errorCatcher(async (req, res) => {
  // FIXME
  const { id, venueId } = validate(req.params, validObjectIdSchema, true)
  const hall = await Hall.findById(id)
  if (!hall) {
    throw new NotFoundError()
  }
  const venue = await Venue.findById(venueId)
  if (!venue) {
    throw new NotFoundError()
  }
  const isOwner = venue.owner.toString() === req.user!.id
  if (!isOwner) {
    throw new ForbiddenError()
  }
  await Hall.deleteOne({ _id: req.params.id })
  return res.sendStatus(204)
}))

router.use('/:hallId/seats', seatRouter)

export default router
