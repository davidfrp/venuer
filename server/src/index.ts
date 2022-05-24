import 'dotenv/config'
import express, { RequestHandler } from 'express'
import authRouter from './routers/auth.router'
import userRouter from './routers/user.router'
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI as string
mongoose.connect(uri)

const app = express()

const allowCors: RequestHandler = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
}

app.use(allowCors)
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
