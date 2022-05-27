const apiUrl: string = import.meta.env.VITE_API_BASE_URL

type ApiResponse = {
  status: 'success' | 'error',
  [key: string]: any
}

/**
 * Requests a resource from the API.
 * @param method HTTP method to use
 * @param path Path of the API endpoint
 * @param body Body of the request
 * @returns Promise that resolves to the response body and status
 */
const request = async (method: string, path: string, body?: any): Promise<ApiResponse> => {
  const options: any = {
    method,
    headers: {},
    credentials: 'include'
  }

  if (body) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${apiUrl}${path}`, options)
  let data: any

  try {
    data = await response.json()
  } catch (_) {
    // Do nothing
  }

  return {
    status: response.status > 199 && response.status < 400 ? 'success' : 'error',
    ...data
  }
}

export const get = (path: string) => {
  return request('GET', path)
}

export const del = (path: string) => {
  return request('DELETE', path)
}

export const post = (path: string, body?: any) => {
  return request('POST', path, body)
}

export const patch = (path: string, body?: any) => {
  return request('PATCH', path, body)
}
