import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { schema } from './graphql/schemaBuilder'
import authContext from './authContext'
import { connect } from 'mongoose'
import express from 'express'
import http from 'http'

import { Location } from './models/location.model'
import { Venue } from './models/venue.model'
import { User } from './models/user.model'

startApolloServer()

async function startApolloServer () {
  connect(process.env.MONGO_URI as string)

  // const user = new User({
  //   name: 'Heather',
  //   email: 'heather@bbc.co.uk',
  //   password: '12345678Aa'
  // })

  // await user.save()

  // const location = new Location({
  //   country: 'Denmark',
  //   city: 'Copenhagen',
  //   postalCode: '2300',
  //   streetName: 'Ørestads Blvd.',
  //   streetNumber: '13',
  //   entrance: 'Gadeplan',
  //   entranceCoordinates: {
  //     latitude: 55.657490,
  //     longitude: 12.589098
  //   }
  // })

  // location.save()

  // const venue = new Venue({
  //   owner: user,
  //   name: 'Hollywood Galla',
  //   description: 'DR Koncerthuset ruller den røde løber ud til en funklende Hollywood-galla med DR Symfoniorkestret, DR Juniorkoret, Andrea Oehlenschlæger, Diluckshan Jeyaratnam og vært Ane Cortzen i centrum for et musikalsk festfyrværkeri fra de bedste Hollywood-film som ”Pirates of the Caribbean”, ”Braveheart” – og mange flere.',
  //   location
  // })

  // await venue.save()

  // const user = await User.findOne()
  // const location = await Location.findOne()
  const venue = await Venue.findOne({
    name: 'Hollywood Galla'
  })

  console.log(venue)

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authContext
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
