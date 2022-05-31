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
  data: Record<string, unknown>,
  schema: Joi.Schema,
  suppressErrors?: boolean
): Record<string, unknown> => {
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

export const validObjectIdSchema = Joi.custom((value, helpers) => {
  if (isValidObjectId(value)) {
    return value
  }
  return helpers.error('any.invalid')
}).message('{{#label}} must be a valid ObjectId')
