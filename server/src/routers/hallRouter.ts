import { Router } from 'express'
import { errorCatcher } from '../utils'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { validate } from '../joi/validator'
import { authContext } from '../middleware/authContext'
import { Venue } from '../models/venueModel'
import { Hall } from '../models/hallModel'
import { createHallSchema } from '../joi/hallValidation'
import seatRouter from './seatRouter'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const venueSlug = req.params.venueSlug

  const venue = await Venue.findOne({
    slug: venueSlug
  }).populate('halls')

  if (venue) {
    return res.send(venue.halls)
  }

  throw new NotFoundError()
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const { name, description, seats } = validate(req.body, createHallSchema)

  const venue = await Venue.findOne({ slug: req.params.venueSlug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.organizer.toString() !== req.user!.id) {
    throw new ForbiddenError('You are not an organizer of this venue')
  }

  const isNameTaken = await Hall.findOne({ name, venue: venue._id })
  if (isNameTaken) {
    throw new BadRequestError('\'name\' is already taken')
  }

  const hall = new Hall({
    name,
    description,
    venue: venue._id,
    seats
  })

  await hall.save()
  await Venue.findByIdAndUpdate(venue._id, { $push: { halls: hall._id } })
  return res.status(201).send(hall)
}))

router.use('/:hallId/seats', seatRouter)

export default router
