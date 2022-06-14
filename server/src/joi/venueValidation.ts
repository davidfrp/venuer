import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const name = Joi.string().trim().min(3).max(2048)

export const description = Joi.string().trim().min(3).max(2048)

// TODO Check all min/max/length/... etc. rules everywhere are consistent
export const location = Joi.object().keys({
  _id: validObjectIdSchema.strip(),
  country: Joi.string().trim().empty('').required(),
  city: Joi.string().trim().empty('').required(),
  postalCode: Joi.string().trim().empty('').required(),
  address: Joi.string().trim().empty('').required(),
  entrance: Joi.string().trim().empty(''),
  entranceCoordinates: Joi.object().keys({
    type: Joi.string().equal('Point'),
    coordinates: Joi.array().length(2).items(Joi.number().precision(8))
  }),
  additionalInfo: Joi.string().trim().empty('')
})

export const halls = Joi.array().items(Joi.object().keys({
  _id: validObjectIdSchema,
  name: name.required(),
  seats: Joi.array().items(validObjectIdSchema).default([])
}))

export const createVenueSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  location: location.required(),
  halls: halls.default([])
})

export const updateVenueSchema = Joi.object({
  name,
  description,
  location,
  halls
})
