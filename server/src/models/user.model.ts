import { Schema, model } from 'mongoose'
import { hash } from 'bcrypt'

interface IUser {
  name: string
  email: string
  password: string
  isVerified: boolean
  isRevoked: boolean
  role: number
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isVerified: { type: Boolean, default: false },
  isRevoked: { type: Boolean, default: false },
  role: { type: Number, default: 0 }
}, { timestamps: true })

// Middleware to hash the password before saving.
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
  next()
})

const User = model<IUser>('User', userSchema)

export { User, userSchema }
