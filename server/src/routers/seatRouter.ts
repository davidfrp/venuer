import { Router } from 'express'
import { isValidObjectId } from 'mongoose'
import { ForbiddenError, NotFoundError } from '../errors'
import { validate } from '../joi/validator'
import { createSeatSchema } from '../joi/seatValidation'
import { authContext } from '../middleware/authContext'
import { Hall } from '../models/hallModel'
import { Seat } from '../models/seatModel'
import { Venue } from '../models/venueModel'
import { errorCatcher } from '../utils'

const router = Router({ mergeParams: true })

router.get('/', errorCatcher(async (req, res) => {
  const { venueId, hallId } = req.params

  if (isValidObjectId(venueId) && isValidObjectId(hallId)) {
    const venue = await Venue.findById(venueId)
    if (venue) {
      const hall = await Hall.findById(hallId)
      if (hall) {
        const seats = await Seat.find({ hall: hall._id })
        return res.send(seats)
      }
    }
  }

  throw new NotFoundError()
}))

router.post('/', authContext, errorCatcher(async (req, res) => {
  const { row, name, additionalInfo } = validate(req.body, createSeatSchema)
  const { venueId, hallId } = req.params

  if (isValidObjectId(venueId) && isValidObjectId(hallId)) {
    const venue = await Venue.findById(venueId)
    if (venue) {
      const hall = await Hall.findById(hallId)
      if (hall) {
        const isOwner = venue.owner.toString() === req.user!.id

        if (!isOwner) {
          throw new ForbiddenError()
        }

        const seat = new Seat({ row, name, additionalInfo })

        await seat.save()
        return res.status(201).send(seat)
      }
    }
  }

  throw new NotFoundError()
}))

export default router
