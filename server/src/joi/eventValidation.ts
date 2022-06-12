import * as Joi from 'joi'
import { validObjectIdSchema } from './validator'

export const hall = validObjectIdSchema

// TODO max names out at a lower value than 2048
export const name = Joi.string().trim().min(3).max(2048)

const youtubePattern = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi

export const videoId = Joi.string().trim()
  .replace(youtubePattern, '$1')

export const description = Joi.string().trim().min(3).max(2048)

export const imageUrl = Joi.string().trim().uri()

export const startsAt = Joi.date().min('now')

export const endsAt = Joi.date().min('now')

export const getEventSchema = Joi.object().keys({
  venue: name,
  after: Joi.date().timestamp('javascript'),
  before: Joi.date().timestamp('javascript'),
  lng: Joi.number(),
  lat: Joi.number(),
  distance: Joi.number(),
  searchTerm: Joi.string().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}).when('.distance', {
  is: Joi.exist(),
  then: Joi.object().and('lng', 'lat', 'distance'),
  otherwise: Joi.object().and('lng', 'lat')
})

export const createEventSchema = Joi.object({
  name: name.required(),
  videoId,
  description: description.required(),
  imageUrl: imageUrl.required(),
  startsAt: startsAt.required(),
  endsAt,
  hall: hall.required()
})
