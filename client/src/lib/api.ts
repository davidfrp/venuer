const apiUrl: string = import.meta.env.VITE_API_BASE_URL

type ApiResponse = [
  data: Record<string, unknown>,
  status: 'success' | 'error'
]

/**
 * Requests a resource from the API.
 * @param method HTTP method to use
 * @param path Path of the API endpoint
 * @param body Body of the request
 * @returns Promise that resolves to the response body and status
 */
const request = async (
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetch: typeof window.fetch = window.fetch
): Promise<ApiResponse> => {
  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body && JSON.stringify(body),
    credentials: 'include'
  })

  let data: Record<string, unknown> = {}

  try {
    data = await response.json()
  } catch (_) {
    // Do nothing
  }

  const status = response.status > 199 && response.status < 400 ? 'success' : 'error'
  return [data, status]
}

export const get = (path: string, fetch?: typeof window.fetch) => {
  return request('GET', path, undefined, fetch)
}

export const del = (path: string, fetch?: typeof window.fetch) => {
  return request('DELETE', path, undefined, fetch)
}

export const post = (path: string, body?: Record<string, unknown>, fetch?: typeof window.fetch) => {
  return request('POST', path, body, fetch)
}

export const patch = (path: string, body?: Record<string, unknown>, fetch?: typeof window.fetch) => {
  return request('PATCH', path, body, fetch)
}
