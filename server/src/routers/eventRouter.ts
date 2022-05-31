import { Router } from 'express'
import { errorCatcher } from '../utils'
import { Event } from '../models/eventModel'
import { validate } from '../joi/validator'
import { createEventSchema } from '../joi/eventValidation'
import { ForbiddenError, NotFoundError } from '../errors'
import { Venue } from '../models/venueModel'
import { authContext } from '../middleware/authContext'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const { venueId } = req.params
  if (venueId) {
    const events = await Event.find({ venue: venueId })
    return res.send(events)
  }
  const events = await Event.find()
  return res.send(events)
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const {
    venue: venueId, hall, name, description, startsAt, endsAt
  } = validate({ venue: req.params.venueId, ...req.body }, createEventSchema)

  const venue = await Venue.findById(venueId)
  if (!venue) {
    throw new NotFoundError()
  }

  if (venue.owner.toString() !== req.user!.id) {
    throw new ForbiddenError()
  }

  const event = new Event({
    venue, hall, name, description, startsAt, endsAt
  })

  const createdEvent = await event.save()
  return res.send(createdEvent)
}))

export default router
