import mongoose from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  registeredAt: string
  role: number
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registeredAt: { type: String, required: true, index: true },
  role: { type: Number, default: 0 }
})

export default mongoose.model<User>('User', userSchema)
