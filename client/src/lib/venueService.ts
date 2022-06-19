import { get, post, patch, del, type ApiResponse } from '$lib/api'

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

// TODO Inherit service methods from abstract base class, adding resource path on top.
export const saveVenue = async ({ slug, ...venue }: Record<string, unknown>) => {
  let response: ApiResponse

  if (slug) {
    response = await patch(`/venues/${slug}`, venue, fetch)
  } else {
    response = await post('/venues', venue, fetch)
  }

  return response
}

export const deleteVenue = async (slug: string, fetch?: typeof window.fetch) =>
  del(`/venues/${slug}`, fetch)
