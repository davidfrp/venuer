import { get, patch } from '$lib/api'

export const getVenues = (fetch?: typeof window.fetch) =>
  get('/venues', fetch)

export const getVenuesByMe = (fetch?: typeof window.fetch) =>
  get('/users/@me/venues', fetch)

export const getVenueById = (id: string, fetch?: typeof window.fetch) =>
  get(`/venues/${id}`, fetch)

export const getVenueBySlug = (slug: string, fetch?: typeof window.fetch) =>
  get(`/venues/${slug}`, fetch)

export const getVenueEvents = (slug: string, fetch?: typeof window.fetch) =>
  get(`/venues/${slug}/events`, fetch)

export const saveVenue = ({ _id, id, ...venue }: Record<string, unknown>) =>
  patch(`/venues/${_id ?? id}`, venue, fetch)
