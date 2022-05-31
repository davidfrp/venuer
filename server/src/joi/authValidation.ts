import * as Joi from 'joi'
import { string } from 'joi'
import { name, email, password } from './userValidation'

export const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
})

export const registerTypes = {
  name: string,
  email: string,
  password: string
}

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
})
