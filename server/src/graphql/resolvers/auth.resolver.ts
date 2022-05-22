import { ApolloError, AuthenticationError } from 'apollo-server-core'
import { User } from '../../models/user.model'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    // Creates a new user
    register: async (_: any, { name, email, password }: any) => {
      const isEmailAvailable = !await User.findOne({ email: email.trim().toLowerCase() })

      if (!isEmailAvailable) {
        throw new ApolloError('Email already registered.', 'EMAIL_ALREADY_REGISTERED')
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(password)) {
        throw new ApolloError('Password is too weak.', 'PASSWORD_TOO_WEAK')
      }

      const user = new User({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      })

      await user.save()

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      )

      return { token }
    },
    // Logs in a user
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email: email.trim().toLowerCase() })

      if (user) {
        const isPasswordValid = await compare(password, user.password)

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
