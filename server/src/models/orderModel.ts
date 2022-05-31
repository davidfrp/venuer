import { model, Schema, Document } from 'mongoose'
import { EventDocument } from './eventModel'
import { SeatDocument } from './seatModel'
import { UserDocument } from './userModel'

interface OrderDocument extends Document {
  vendee: UserDocument
  event: EventDocument
  seats: SeatDocument[]
}

const OrderSchema = new Schema({
  vendee: { type: Schema.Types.ObjectId, ref: 'User' },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }]
}, { timestamps: true })

OrderSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, ...rest }) => rest
})

const Order = model<OrderDocument>('Order', OrderSchema)

export { Order, OrderDocument, OrderSchema }
