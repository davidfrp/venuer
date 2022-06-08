import { model, Schema, Document } from 'mongoose'
import { VenueDocument } from './venueModel'

interface BlockDocument extends Document {
  name: string
  additionalInfo?: string
  venue: VenueDocument
}

const BlockSchema = new Schema({
  name: { type: String, required: true },
  additionalInfo: { type: String },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true }
}, { timestamps: true })

BlockSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

const Block = model<BlockDocument>('Block', BlockSchema)

export { Block, BlockDocument, BlockSchema }
