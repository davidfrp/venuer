import * as Joi from 'joi'

export const row = Joi.number().integer().min(1)

export const name = Joi.string().trim().min(3).max(2048)

export const additionalInfo = Joi.string().trim().min(3).max(2048)

export const createSeatSchema = Joi.object({
  row,
  name,
  additionalInfo
})
