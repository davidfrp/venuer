import { get, patch } from '$lib/api'

export const me = () =>
  get('/users/@me')

export const save = ({ ...user }) =>
  patch('/users/@me', user)
