import { ObjectId } from 'mongoose'
import { Venue } from '../../models/venue.model'
import { User } from '../../models/user.model'
import { Location } from '../../models/location.model'
import { Event } from '../../models/event.model'
import { Hall } from '../../models/hall.model'

export default {
  Query: {
    // Gets all venues
    venues: async () => await Venue.find({}),
    // Gets a specific venue by id
    venue: async (_: any, { id }: { id: string }) => {
      return await Venue.findById(id)
    }
  },
  Venue: {
    owner: async ({ owner: ownerId }: { owner: ObjectId }) => {
      return await User.findById(ownerId)
    },
    location: async ({ location: locationId }: { location: ObjectId }) => {
      return await Location.findById(locationId)
    },
    halls: async ({ _id }: { _id: ObjectId }) => {
      return await Hall.find({ venue: _id })
    },
    events: async ({ _id }: { _id: ObjectId }) => {
      return await Event.find({ venue: _id })
    }
  }
}
