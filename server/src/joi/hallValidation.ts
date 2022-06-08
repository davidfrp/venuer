import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const name = Joi.string().trim().min(3).max(2048)

export const description = Joi.string().trim().min(3).max(2048)

export const createHallSchema = Joi.object({
  name: name.required(),
  description,
  seats: Joi.array().items(validObjectIdSchema).default([])
})
