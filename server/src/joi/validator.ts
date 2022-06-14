import * as Joi from 'joi'
import { isValidObjectId } from 'mongoose'
import { BadRequestError } from '../errors'

/**
 * Validates the given object against the given schema.
 * @param {any} [data] The data to validate
 * @param {Joi.ObjectSchema} [schema] The schema to validate against
 * @param {boolean} [suppressErrors] If true, errors will not be thrown
 * @returns The validated data or undefined
 */
export const validate = (
  data: any,
  schema: Joi.Schema,
  suppressErrors?: boolean
): any => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    errors: { wrap: { label: '\'' } }
  })

  if (!error) {
    return value
  }

  if (!suppressErrors) {
    throw new BadRequestError(error.message)
  }

  return {}
}

const isValidObjectIdValidator: Joi.CustomValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value
  }
  return helpers.error('any.invalid')
}

export const validObjectIdSchema = Joi.alternatives().try(
  Joi.string().custom(isValidObjectIdValidator)
    .message('{{#label}} must be a valid ObjectId'),
  Joi.object().min(1).pattern(/^/, isValidObjectIdValidator)
    .message('{{#label}} must be a valid ObjectId')
)
