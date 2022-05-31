import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import venueRouter from './routers/venueRouter'
import eventRouter from './routers/eventRouter'
import allowCors from './middleware/allowCors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { NotFoundError } from './errors'

const uri = process.env.MONGODB_URI as string
mongoose.connect(uri)

const app = express()

// Preliminary middleware
app.use(allowCors)
app.use(cookieParser())
app.use(express.json())

// TODO Add rate limiter

// Routers
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/venues', venueRouter)
app.use('/events', eventRouter)

// Unknown routes
app.use(() => {
  throw new NotFoundError()
})

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  const { status, message, code } = err
  if (res.headersSent) {
    return next(err)
  }
  if (status) {
    res.status(status).send({ message, code })
  } else {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
