import { get, patch } from '$lib/api'

export const getEvents = (fetch: typeof window.fetch) =>
  get('/events', fetch)

export const getEventsByVenue = (slug: string, fetch?: typeof window.fetch) =>
  get(`/venues/${slug}/events`, fetch)

export const getEventBySlug = (slug: string, fetch?: typeof window.fetch) =>
  get(`/events/${slug}`, fetch)

export const saveEvent = ({ _id, id, ...event }: Record<string, unknown>) =>
  patch(`/events/${_id ?? id}`, event, fetch)
