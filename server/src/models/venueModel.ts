import { model, Schema, Document } from 'mongoose'
import { LocationDocument, LocationSchema } from './locationSchema'
import { SeatDocument } from './seatModel'
import { UserDocument } from './userModel'

interface VenueDocument extends Document {
  organizer: UserDocument
  name: string
  slug: string
  description: string
  location: LocationDocument
  halls: {
    _id: string
    name: string
    seats: SeatDocument[]
  }[]
}

const VenueSchema = new Schema({
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  halls: [
    {
      name: { type: String, required: true },
      seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }]
    }
  ]
}, { timestamps: true })

VenueSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

// TODO FIX ALL PRE REMOVE
VenueSchema.pre('remove', async function (next) {
  await this.model('Event').deleteMany({ 'venue._id': this._id })
  // await this.model('Hall').deleteMany({ venue: this._id })
  next()
})

const Venue = model<VenueDocument>('Venue', VenueSchema)

export { Venue, VenueDocument, VenueSchema }
