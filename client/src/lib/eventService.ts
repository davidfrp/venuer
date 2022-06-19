import { get, post, patch, type ApiResponse } from '$lib/api'

export const getEvents = (fetch: typeof window.fetch) =>
  get('/events', fetch)

export const getEventsByVenue = (slug: string, fetch?: typeof window.fetch) =>
  get(`/venues/${slug}/events`, fetch)

export const getEventBySlug = (slug: string, fetch?: typeof window.fetch) =>
  get(`/events/${slug}`, fetch)

export const saveEvent = async ({ slug, venue, ...event }: Record<string, unknown>) => {
  let response: ApiResponse

  if (slug) {
    response = await patch(`/venues/${(venue as Venue).slug}/events/${slug}`, event, fetch)
  } else {
    response = await post(`/venues/${(venue as Venue).slug}/events`, event, fetch)
  }

  return response
}
