import { HydratedDocument, Schema, model } from 'mongoose'
import { Venue } from './venue.model'

interface IHall {
  name: string
  description: string
  venue: HydratedDocument<typeof Venue>
}

const hallSchema = new Schema<IHall>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' }
})

const Hall = model<IHall>('hall', hallSchema)

export { Hall, hallSchema }
