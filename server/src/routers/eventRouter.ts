import { Router } from 'express'
import { errorCatcher } from '../utils'
import { Event } from '../models/eventModel'
import { validate } from '../joi/validator'
import { createEventSchema, getEventSchema } from '../joi/eventValidation'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { Venue, VenueDocument } from '../models/venueModel'
import { authContext } from '../middleware/authContext'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const {
    venue: venueSlug, after, before, lng, lat, distance, searchTerm
  } = validate(req.query, getEventSchema)

  const filter: {
    $lookup?: {}
    $or?: Record<string, RegExp>[]
    startsAt?: {
      $gte?: Date,
      $lte?: Date
    },
    'venue._id'?: string,
    'venue.location.entranceCoordinates'?: unknown
  } = {}

  if (after || before) {
    filter.startsAt = {}

    if (after) {
      filter.startsAt.$gte = after
    }

    if (before) {
      filter.startsAt.$lte = before
    }
  }

  if (searchTerm) {
    filter.$or = [
      { name: new RegExp(searchTerm, 'gi') },
      { description: new RegExp(searchTerm, 'gi') },
      { 'venue.name': new RegExp(searchTerm, 'gi') }
    ]
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

  // const events = await Event.find({
  //   $lookup: {
  //     from: 'venues',
  //     localField: 'venue',
  //     foreignField: '_id',
  //     as: 'venue'
  //   },
  //   ...filter
  // })

  const events = await Event.aggregate([
    {
      $lookup: {
        from: 'venues',
        localField: 'venue',
        foreignField: '_id',
        as: 'venue'
      }
    },
    {
      $unwind: {
        path: '$venue',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        ...filter
      }
    }
  ])

  return res.send(events)
}))

router.get('/:slug', errorCatcher(async (req, res) => {
  const event = await Event.findOne({
    slug: req.params.slug
  }).populate('venue')

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

  console.log(req.body)

  const venueSlug: string = req.params.venueSlug ?? req.body.venue?.slug
  const venue: (VenueDocument & {
    _id: any
  }) | null = await Venue.findOne({
    $or: [
      { slug: venueSlug },
      { _id: req.body.venue?._id }
    ]
  })

  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.organizer.toString() !== req.user!.id) {
    throw new ForbiddenError('You\'re not an organizer of the venue for this event')
  }

  console.log(venue.halls)
  console.log(hallId, typeof hallId)
  console.log(venue.halls[0]._id, typeof venue.halls[0]._id)

  const isHallFound = venue.halls.some(h => h._id.toString() === hallId)
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
