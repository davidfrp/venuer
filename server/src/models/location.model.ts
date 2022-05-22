import { Schema, model } from 'mongoose'

interface ILocation {
  country: string
  city: string
  postalCode: string
  streetName: string
  streetNumber: string
  entrance?: string
  entranceCoordinates?: {
    latitude: number
    longitude: number
  }
  floor?: string
  apartment?: string
  additionalInfo?: string
}

const locationSchema = new Schema<ILocation>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  entrance: { type: String, required: true },
  entranceCoordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  floor: { type: String, required: false },
  apartment: { type: String, required: false },
  additionalInfo: { type: String, required: false }
})

const Location = model<ILocation>('Location', locationSchema)

export { Location, locationSchema }
