import { HydratedDocument, Schema, model } from 'mongoose'
import { Location } from './location.model'
import { User } from './userModel'

interface IEvent {
  owner: HydratedDocument<typeof User>
  name: string
  description: string
  location?: HydratedDocument<typeof Location>
}

const eventSchema = new Schema<IEvent>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', default: null }
}, { timestamps: true })

const Event = model<IEvent>('event', eventSchema)

export { Event, eventSchema }
