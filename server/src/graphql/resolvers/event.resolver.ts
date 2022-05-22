import { ObjectId } from 'mongoose'
import { Event } from '../../models/event.model'
import { Venue } from '../../models/venue.model'
import { Hall } from '../../models/hall.model'

export default {
  Query: {
    // Gets all events
    events: async () => await Event.find({}),
    // Gets a specific venue by id
    event: async (_: any, { id }: { id: string }) => {
      return await Event.findById(id)
    }
  },
  Event: {
    venue: async ({ venue: venueId }: { venue: ObjectId }) => {
      return await Venue.findById(venueId)
    },
    hall: async ({ hall: hallId }: { hall: ObjectId }) => {
      return await Hall.findById(hallId)
    }
  }
}
