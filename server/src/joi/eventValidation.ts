import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const hall = validObjectIdSchema

export const name = Joi.string().trim().min(3).max(255)

const youtubePattern = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi

export const videoId = Joi.string().trim()
  .replace(youtubePattern, '$1')

export const description = Joi.string().trim().min(3).max(255)

export const startsAt = Joi.date().min('now')

export const endsAt = Joi.date().min('now')

export const createEventSchema = Joi.object({
  name: name.required(),
  videoId: videoId.required(),
  description: description.required(),
  startsAt: startsAt.required(),
  endsAt: endsAt.required(),
  hall: hall.required()
})
