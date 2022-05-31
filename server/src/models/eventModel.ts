import { model, Schema, Document } from 'mongoose'
import { HallDocument } from './hallModel'
import { VenueDocument } from './venueModel'

interface EventDocument extends Document {
  venue: VenueDocument
  name: string
  description: string
  hall: HallDocument
  startsAt: Date
  endsAt: Date
}

const EventSchema = new Schema({
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: true },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true }
}, { timestamps: true })

EventSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

EventSchema.pre('remove', async function (next) {
  // const location = await Location.findById(this.location)
  // await location?.remove()
  next()
})

const Event = model<EventDocument>('Event', EventSchema)

export { Event, EventDocument, EventSchema }
