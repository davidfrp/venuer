import { session } from '$app/stores'
import { post } from '$lib/api'

export const register = (name: string, email: string, password: string) =>
  post('/auth/register', { name, email, password })

export const login = (email: string, password: string) =>
  post('/auth/login', { email, password })

export const logout = () => {
  session.set({ user: null })
  post('/auth/logout')
}
