import * as Joi from 'joi'
import { name, email, password } from './userValidation'

export const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
})

export const loginSchema = Joi.object({
  name: name.strip(),
  email: email.required(),
  password: password.required()
})

export const forgotSchema = Joi.object({
  email: email.required()
})
