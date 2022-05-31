import { get, patch } from '$lib/api'

export const me = (fetch?: typeof window.fetch) =>
  get('/users/@me', fetch)

export const myVenues = (fetch?: typeof window.fetch) =>
  get('/users/@me/venues', fetch)

export const save = ({ ...user }: Record<string, unknown>) =>
  patch('/users/@me', user, fetch)
