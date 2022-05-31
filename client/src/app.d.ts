/// <reference types="@sveltejs/kit" />

type Venue = {
  _id: string
  name: string
  description: string
  location: {
    country: string | undefined
    city: string | undefined
    postalCode: string | undefined
    address: string | undefined
    entrance: string | undefined
    entranceCoordinates: string | undefined
    additionalInfo: string | undefined
  }
}

declare type User = {
  id: string
  role: number
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  interface Session {
    user: User | null
  }
  // interface Stuff {}
}
