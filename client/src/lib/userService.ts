import { get, patch } from '$lib/api'

export const getMe = (fetch?: typeof window.fetch) =>
  get('/users/@me', fetch)

export const saveMe = ({ ...user }: Record<string, unknown>) =>
  patch('/users/@me', user, fetch)
