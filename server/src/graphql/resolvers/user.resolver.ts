import { AuthenticationError } from 'apollo-server-core'
import User from '../../models/user.model'

export default {
  Query: {
    // Returns the current user, requires authentication
    // @ts-ignore noImplicitAny
    me: async (_, __, { userId }) => {
      if (!userId) {
        throw new AuthenticationError('Requires authentication.')
      }
      return await User.findById(userId)
    },
    // Retrieves a user by id
    // @ts-ignore noImplicitAny
    user: async (_, { id }) => {
      return await User.findById(id)
    },
    // Retrieves all users
    // @ts-ignore noImplicitAny
    users: async () => {
      return await User.find({})
    }
  }
}
