import * as Joi from 'joi'
import { BadRequestError } from '../errors'

const name = Joi.string().trim().min(3).max(255)

const email = Joi.string().email().lowercase().trim().min(3).max(255)

const password = Joi.string().min(8).max(72, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('{{#label}} is too weak')

const newPassword = password

export const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
})

export const loginSchema = Joi.object({
  name: name.required(),
  email: email.required()
})

export const updateUserSchema = Joi.object({
  name,
  email,
  password: password.required(),
  newPassword
}).or('name', 'email', 'newPassword')

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { errors: { wrap: { label: '\'' } } })
  if (error) {
    throw new BadRequestError(error.message)
  }
  return value
}
