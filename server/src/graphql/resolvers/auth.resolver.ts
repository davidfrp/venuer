import { ApolloError, AuthenticationError } from 'apollo-server-core'
import User from '../../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default {
  Mutation: {
    // Creates a new user
    // @ts-ignore noImplicitAny
    register: async (_, { name, email, password }) => {
      const isEmailAvailable = !await User.findOne({ email: email.trim().toLowerCase() })

      if (!isEmailAvailable) {
        throw new ApolloError('Email already registered.', 'EMAIL_ALREADY_REGISTERED')
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(password)) {
        throw new ApolloError('Password is too weak.', 'PASSWORD_TOO_WEAK')
      }

      const user = await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: await bcrypt.hash(password, 10),
        registeredAt: new Date().getTime()
      })

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      )

      return { token }
    },
    // Logs in a user
    // @ts-ignore noImplicitAny
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email.trim().toLowerCase() })

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
          )
          return { token }
        }
      }

      throw new AuthenticationError('Wrong email or password.')
    }
  }
}
