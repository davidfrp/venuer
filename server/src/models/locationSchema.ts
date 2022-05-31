import { Schema, Document } from 'mongoose'

interface LocationDocument extends Document {
  country: string
  city: string
  postalCode: string
  address: string
  entrance?: string
  entranceCoordinates?: {
    type: 'Point'
    coordinates: [number, number]
  }
  additionalInfo?: string
}

const LocationSchema = new Schema<LocationDocument>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  address: { type: String, required: true },
  entrance: { type: String },
  entranceCoordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: undefined
    },
    coordinates: {
      type: [Number],
      default: undefined
    }
  },
  additionalInfo: { type: String }
})// .index({ entranceCoordinates: '2dsphere' })

// FIXME Add index
// locationSchema.index({ entranceCoordinates: '2dsphere' })

// const Location = model<LocationDocument>('Location', locationSchema)

export { LocationDocument, LocationSchema }
