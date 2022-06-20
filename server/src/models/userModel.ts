import { model, Schema, Document } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { Venue } from './venueModel'
import { Order } from './orderModel'

// TODO Add lastPasswordChangedAt and lastLoginAt
interface UserDocument extends Document {
  name: string
  email: string
  password: string
  lastPasswordChangedAt: Date
  lastLoginAt: Date
  isVerified: boolean
  role: number
}

interface UserModel extends UserDocument {
  matchesPassword(password: string): Promise<boolean>
  sendPasswordReset(): void
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastPasswordChangedAt: { type: Date, required: true },
  lastLoginAt: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: Number, default: 0 }
})

UserSchema.set('timestamps', true)

UserSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, password, ...rest }) => rest
})

UserSchema.method('matchesPassword', async function (password: string) {
  return await compare(password, this.password)
})

UserSchema.method('sendPasswordReset', async function () {
})

UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await hash(this.password, Number(process.env.BCRYPT_SALT_ROUNDS))
  }
  next()
})

UserSchema.pre('remove', async function (next) {
  const venues = await Venue.find({ organizer: this._id })
  await Promise.all(venues.map(venue => venue.remove()))

  const orders = await Order.find({ vendee: this._id })
  await Promise.all(orders.map(order => order.remove()))
  next()
})

const User = model<UserModel>('User', UserSchema)

export { User, UserDocument, UserSchema }
