import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'
import authResolvers from './resolvers/auth.resolver'
import userResolvers from './resolvers/user.resolver'
import venueResolvers from './resolvers/venue.resolver'
import eventResolvers from './resolvers/event.resolver'

interface IResolvers {
  [key: PropertyKey]: IResolvers | ((parent: any, args: any, context: any, info: any) => any)
}

class SchemaBuilder {
  resolvers: IResolvers[] = []
  typeDefs: any

  setResolvers (...resolvers: IResolvers[]) {
    this.resolvers = resolvers
    return this
  }

  loadTypeDefs (path: string) {
    this.typeDefs = loadFilesSync(path)
    return this
  }

  build () {
    return makeExecutableSchema({
      typeDefs: mergeTypeDefs(this.typeDefs),
      resolvers: mergeResolvers(this.resolvers)
    })
  }
}

export const schema = new SchemaBuilder()
  .loadTypeDefs('src/graphql/types/**/*.graphql')
  .setResolvers(
    authResolvers,
    userResolvers,
    venueResolvers,
    eventResolvers
  ).build()
