import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const venue = validObjectIdSchema

export const hall = validObjectIdSchema

export const name = Joi.string().trim().min(3).max(255)

export const description = Joi.string().trim().min(3).max(255)

export const startsAt = Joi.date().min('now')

export const endsAt = Joi.date().min('now')

export const createEventSchema = Joi.object({
  venue: venue.required(),
  hall: hall.required(),
  name: name.required(),
  description: description.required(),
  startsAt: startsAt.required(),
  endsAt: endsAt.required()
})
