import { model, Schema, Document } from 'mongoose'

interface SeatDocument extends Document {
  row: number
  name: number
  additionalInfo?: string
}

const SeatSchema = new Schema({
  row: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  additionalInfo: { type: String }
}, { timestamps: true })

SeatSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

const Seat = model<SeatDocument>('Seat', SeatSchema)

export { Seat, SeatDocument, SeatSchema }
