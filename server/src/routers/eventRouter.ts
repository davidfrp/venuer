import { Router } from 'express'
import { errorCatcher } from '../utils'
import { Event } from '../models/eventModel'
import { validate } from '../joi/validator'
import { createEventSchema } from '../joi/eventValidation'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { Venue } from '../models/venueModel'
import { authContext } from '../middleware/authContext'
import { Hall } from '../models/hallModel'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const venueSlug = req.params.venueSlug
  if (venueSlug) {
    const venue = await Venue.findOne()
    if (!venue) {
      throw new NotFoundError()
    }

    const events = await Event.find({ 'venue.slug': venueSlug })
    return res.send(events)
  }

  // const events = await Event.find().populate('venue')
  const events = await Event.find().populate('venue')
  // const events = await Event.find().lean().populate('venue.name')
  return res.send(events)
}))

router.get('/:slug', errorCatcher(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug })
  if (event) {
    return res.send(event)
  }

  throw new NotFoundError()
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const {
    name, description, videoId, startsAt, endsAt, hall: hallId
  } = validate(req.body, createEventSchema)

  const slug = (name as string)
    .trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')

  const isSlugTaken = await Event.exists({ slug })

  if (isSlugTaken) {
    throw new BadRequestError('\'name\' results in a \'slug\' that is already used by another event')
  }

  const venue = await Venue.findOne({ slug: req.params.venueSlug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.owner.toString() !== req.user!.id) {
    throw new ForbiddenError('You\'re not the owner of this venue')
  }

  const isHallFound = !!await Hall.findById(hallId)
  if (!isHallFound) {
    throw new NotFoundError('Hall not found')
  }

  const event = new Event({
    name, slug, description, videoId, startsAt, endsAt, venue: venue._id, hall: hallId
  })

  const createdEvent = await event.save()
  return res.status(201).send(createdEvent)
}))

export default router
