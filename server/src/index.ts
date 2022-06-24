import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import venueRouter from './routers/venueRouter'
import eventRouter from './routers/eventRouter'
import allowCors from './middleware/allowCors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import http from 'http'
import { NotFoundError } from './errors'
import { Server } from 'socket.io'

const uri = process.env.MONGODB_URI as string
mongoose.connect(uri)

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000'
    ]
  }
})

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('startedTyping', (author) => {
    io.emit('startedTyping', author)
  })

  socket.on('stoppedTyping', (author) => {
    io.emit('stoppedTyping', author)
  })
})

app.use(allowCors)
app.use(cookieParser())
app.use(express.json())

// TODO Use smth like helmet
// TODO Add rate limiter

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/venues', venueRouter)
app.use('/events', eventRouter)

app.use(express.static(path.resolve('../client/public')))

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

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
