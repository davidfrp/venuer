import { model, Schema, Document } from 'mongoose'
import { HallDocument } from './hallModel'
import { VenueDocument } from './venueModel'

interface EventDocument extends Document {
  venue: VenueDocument
  name: string
  slug: string
  description: string
  videoId?: string
  startsAt: Date
  endsAt: Date
  hall: HallDocument
}

const EventSchema = new Schema({
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  videoId: { type: String },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },
  hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: true }
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
