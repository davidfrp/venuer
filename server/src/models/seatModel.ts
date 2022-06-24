import { model, Schema, Document } from 'mongoose'

interface SeatDocument extends Document {
  row?: string
  number?: string
  additionalInfo?: string
}

const SeatSchema = new Schema({
  row: { type: String },
  number: { type: String },
  additionalInfo: { type: String }
}, { timestamps: true })

SeatSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

const Seat = model<SeatDocument>('Seat', SeatSchema)

export { Seat, SeatDocument, SeatSchema }
