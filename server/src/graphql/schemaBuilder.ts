import { loadFiles } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema'

export async function makeSchema () {
  const typeDefs = await loadFiles('./src/graphql/types/*.{gql,graphql}')

  const resolvers = await loadFiles(
    './src/graphql/resolvers/*.ts',
    {
      ignoreIndex: true,
      requireMethod: async (path: string) => {
        const file = path.split('/').pop()

        const module = await import(`./resolvers/${file?.replace('.ts', '')}`)

        return module.default
      }
    }
  )

  return makeExecutableSchema({ typeDefs, resolvers })
}
