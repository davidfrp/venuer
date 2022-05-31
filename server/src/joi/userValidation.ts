import * as Joi from 'joi'

export const name = Joi.string().trim().min(1).max(255)

export const email = Joi.string().email().lowercase().trim().max(255)

export const password = Joi.string().min(8).max(72, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('{{#label}} must contain at least one uppercase letter, one lowercase letter and one number')

const newPassword = password

export const updateUserSchema = Joi.object({
  name,
  email,
  password: password.required(),
  newPassword
}).or('name', 'email', 'newPassword')
