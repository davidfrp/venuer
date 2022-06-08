import { Router } from 'express'
import { errorCatcher } from '../utils'
import { Event } from '../models/eventModel'
import { validate } from '../joi/validator'
import { createEventSchema, getEventSchema } from '../joi/eventValidation'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { Venue } from '../models/venueModel'
import { authContext } from '../middleware/authContext'
import { Hall } from '../models/hallModel'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const {
    venue: venueSlug, after, before, lng, lat, distance
  } = validate(req.query, getEventSchema)

  const filter: {
    startsAt: {
      $gte?: Date
      $lte?: Date
    }
    'venue._id'?: string
    'venue.location.entranceCoordinates'?: unknown
  } = { startsAt: {} }

  filter.startsAt.$gte = new Date(Number(after) || 0)

  if (before) {
    filter.startsAt.$lte = new Date(Number(before))
  }

  if (venueSlug) {
    const venue = await Venue.findOne({ slug: venueSlug })
    filter['venue._id'] = venue?._id
  }

  if (lng && lat) {
    filter['venue.location.entranceCoordinates'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)]
        },
        $maxDistance: Number(distance) || 10000
      }
    }
  }

  const events = await Event.find(filter)
  return res.send(events)
}))

router.get('/:slug', errorCatcher(async (req, res) => {
  const event = await Event.findOne({
    slug: req.params.slug
  }).populate('hall').populate('venue')

  if (event) {
    return res.send(event)
  }

  throw new NotFoundError()
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const {
    name, description, imageUrl, videoId, startsAt, endsAt, hall: hallId
  } = validate(req.body, createEventSchema)

  const padWithZero = (num: number) => num < 10 ? `0${num}` : num
  const startDate = new Date(startsAt)
  const formattedStartDate = [
    startDate.getFullYear(),
    padWithZero(startDate.getMonth() + 1),
    padWithZero(startDate.getDate())
  ].join('-')

  const slug = (name as string)
    .trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-') +
    '-' + formattedStartDate

  const isSlugTaken = await Event.exists({ slug })

  if (isSlugTaken) {
    throw new BadRequestError('\'name\' and \'startsAt\' results in a \'slug\' that is already used by another event')
  }

  const venue = await Venue.findOne({ slug: req.params.venueSlug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.organizer.toString() !== req.user!.id) {
    throw new ForbiddenError('You\'re not an organizer of the venue for this event')
  }

  const isHallFound = !!await Hall.findById(hallId)
  if (!isHallFound) {
    throw new NotFoundError('Hall not found')
  }

  const event = new Event({
    name,
    slug,
    description,
    imageUrl,
    videoId,
    startsAt,
    endsAt,
    venue,
    hall: hallId
  })

  const createdEvent = await event.save()
  return res.status(201).send(createdEvent)
}))

export default router
