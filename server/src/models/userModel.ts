import { model, Schema, Document } from 'mongoose'
import { hash, compare } from 'bcrypt'

interface UserDocument extends Document {
  name: string
  email: string
  password: string
  isVerified: boolean
  role: number,
  matchesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: Number, default: 0 }
})

userSchema.set('timestamps', true)

// Remove sensitive fields whenever the model is transformed into JSON.
userSchema.set('toJSON', {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  transform: (_, { __v, password, ...rest }) => rest
})

userSchema.method('matchesPassword', async function (password: string) {
  return await compare(password, this.password)
})

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await hash(this.password, Number(process.env.BCRYPT_SALT_ROUNDS))
  }
  next()
})

// userSchema.pre('update', async function (next) {
//   try {
//     if (this.update.password) {
//       const hashed = await hash(this.update.password, 10)
//       this.update.password = hashed
//     }
//     next()
//   } catch (err: any) {
//     return next(err)
//   }
// })

const User = model<UserDocument>('User', userSchema)

export { User, UserDocument, userSchema }
