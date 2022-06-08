import { model, Schema, Document } from 'mongoose'
import { BlockDocument } from './blockModel'

interface SeatDocument extends Document {
  row?: string
  number?: string
  additionalInfo?: string
  block: BlockDocument
}

const SeatSchema = new Schema({
  row: { type: String },
  number: { type: String },
  additionalInfo: { type: String },
  block: { type: Schema.Types.ObjectId, ref: 'Block' }
}, { timestamps: true })

SeatSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

const Seat = model<SeatDocument>('Seat', SeatSchema)

export { Seat, SeatDocument, SeatSchema }
