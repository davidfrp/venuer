import * as Joi from 'joi'

export const name = Joi.string().trim().min(3).max(255)

export const description = Joi.string().trim().min(3).max(255)

// TODO Check all min/max/length/... etc. rules everywhere are consistent
export const location = Joi.object().keys({
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

export const createVenueSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  location: location.required()
})

export const updateVenueSchema = Joi.object({
  name,
  description,
  location
})
