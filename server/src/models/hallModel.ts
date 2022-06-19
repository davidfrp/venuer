import { Schema, Document } from 'mongoose'
import { SeatDocument } from './seatModel'
import { VenueDocument } from './venueModel'

interface HallDocument extends Document {
  name: string
  venue: VenueDocument
  seats: SeatDocument[]
}

const HallSchema = new Schema({
  name: { type: String, required: true },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
  seats: [{ type: Schema.Types.ObjectId, ref: 'Seat', default: [] }]
}, { timestamps: true })

HallSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

export { HallDocument, HallSchema }
