import { Router } from 'express'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { authContext } from '../middleware/authContext'
import { Venue } from '../models/venueModel'
import { errorCatcher } from '../utils'
import { createVenueSchema, updateVenueSchema } from '../joi/venueValidation'
import { validate } from '../joi/validator'
import eventRouter from './eventRouter'
import hallRouter from './hallRouter'

const router = Router()

router.get('/', errorCatcher(async (req, res) => {
  const { lng, lat, radius } = req.query

  if (lat && lng && radius) {
    const venues = await Venue.where('location.entranceCoordinates')
      .within({ center: [lng, lat], radius, spherical: true })
    return res.send({ venues })
  }

  const venues = await Venue.find()
  return res.send(venues)
}))

router.get('/:id', errorCatcher(async (req, res) => {
  const venue = await Venue.findById(req.params.id)
  if (!venue) {
    throw new NotFoundError()
  }
  return res.send(venue)
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  if (req.user!.role < 1) {
    throw new ForbiddenError()
  }

  const {
    name,
    description,
    location,
    halls
  } = validate(req.body, createVenueSchema)

  const isNameTaken = await Venue.exists({ name })

  if (isNameTaken) {
    throw new BadRequestError('\'name\' is already used by another venue')
  }

  const venue = new Venue({
    owner: req.user!.id,
    name,
    slug: (
      (name as string)
        .trim()
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    ),
    description,
    location,
    halls
  })

  const createdVenue = await venue.save()
  return res.status(201).send(createdVenue)
}))

router.patch('/:id', authContext, errorCatcher(async (req, res) => {
  if (req.user!.role < 1) {
    throw new ForbiddenError()
  }

  const data = validate(req.body, updateVenueSchema)

  const venue = await Venue.findById(req.params.id)
  if (!venue) {
    throw new NotFoundError()
  }

  if (venue.owner.toString() !== req.user!.id) {
    throw new ForbiddenError('You are not allowed to update this venue')
  }

  venue.set(data)
  const updatedVenue = await venue.save()

  return res.send(updatedVenue)
}))

router.use('/:venueId/events', eventRouter)
router.use('/:venueId/halls', hallRouter)

export default router
