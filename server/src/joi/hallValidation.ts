import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const name = Joi.string().trim().min(3).max(2048)

export const description = Joi.string().trim().min(3).max(2048)

const seat = validObjectIdSchema

export const block = Joi.object().keys({
  name: name.required(),
  seats: Joi.array().items(seat).required()
})

export const blocks = Joi.array().items(block)

export const createHallSchema = Joi.object({
  name: name.required(),
  blocks: blocks.required()
})
