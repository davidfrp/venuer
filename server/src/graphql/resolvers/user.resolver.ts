import { AuthenticationError } from 'apollo-server-core'
import { HydratedDocument } from 'mongoose'
import { User } from '../../models/user.model'

export default {
  Query: {
    // Returns the current user, requires authentication
    me: async (_: any, __: any, { userId }: any) => {
      if (!userId) {
        throw new AuthenticationError('Requires authentication.')
      }
      return await User.findById(userId)
    },
    // Retrieves a user by id
    user: async (_: any, { id }: HydratedDocument<typeof User>) => {
      return await User.findById(id)
    },
    // Retrieves all users
    users: async () => {
      return await User.find({})
    }
  }
}
