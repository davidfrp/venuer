import { get, post, patch } from '$lib/api'

export const getEvents = (fetch: typeof window.fetch) =>
  get('/events', fetch)

export const getEventsByVenue = (slug: string, fetch?: typeof window.fetch) =>
  get(`/venues/${slug}/events`, fetch)

export const getEventBySlug = (slug: string, fetch?: typeof window.fetch) =>
  get(`/events/${slug}`, fetch)

export const saveEvent = async ({ slug, ...event }: Record<string, unknown>) => {
  let response: [Record<string, unknown>, 'error' | 'success']

  if (slug) {
    response = await patch(`/events/${slug}`, event, fetch)
  } else {
    response = await post('/events', event, fetch)
  }

  return response
}
