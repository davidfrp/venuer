import { Router } from 'express'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import { authContext } from '../middleware/authContext'
import { Venue } from '../models/venueModel'
import { errorCatcher } from '../utils'
import { createVenueSchema, updateVenueSchema } from '../joi/venueValidation'
import { validate } from '../joi/validator'
import eventRouter from './eventRouter'

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

router.get('/:slug', errorCatcher(async (req, res) => {
  const venue = await Venue.findOne({ slug: req.params.slug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  return res.send(venue)
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  if (req.user!.role < 1) {
    throw new ForbiddenError('Vendees are not allowed to create venues')
  }

  const {
    name,
    description,
    location,
    halls
  } = validate(req.body, createVenueSchema)

  const slug = (name as string)
    .trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')

  const isSlugTaken = await Venue.exists({ slug })
  if (isSlugTaken) {
    throw new BadRequestError('\'name\' results in a \'slug\' that is already used by another event')
  }

  const venue = new Venue({
    organizer: req.user!.id,
    name,
    slug,
    description,
    location,
    halls
  })

  const createdVenue = await venue.save()
  return res.status(201).send(createdVenue)
}))

router.patch('/:slug', authContext, errorCatcher(async (req, res) => {
  const data = validate(req.body, updateVenueSchema)

  const venue = await Venue.findOne({ slug: req.params.slug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.organizer.toString() !== req.user!.id) {
    throw new ForbiddenError('You\'re not an organizer of this venue')
  }

  venue.set(data)
  const updatedVenue = await venue.save()

  return res.send(updatedVenue)
}))

router.delete('/:slug', authContext, errorCatcher(async (req, res) => {
  const venue = await Venue.findOne({ slug: req.params.slug })
  if (!venue) {
    throw new NotFoundError('Venue not found')
  }

  if (venue.organizer.toString() !== req.user!.id) {
    throw new ForbiddenError('You\'re not an organizer of this venue')
  }

  await venue.remove()
  return res.sendStatus(204)
}))

router.use('/:venueSlug/events', eventRouter)

export default router
