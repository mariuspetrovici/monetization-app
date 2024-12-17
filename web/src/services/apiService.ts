import { API_BASE } from './config'

interface FetchDataProps {
  path: string
  payload?: any
  tokenRequired?: boolean
}

// Utility function to make HTTP requests
const request = async (method: string, { path, payload }: FetchDataProps): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      ...(payload && { body: JSON.stringify(payload) }),
    })

    if (!response.ok) {
      const errorBody = await response.json()

      throw {
        status: errorBody.status || response.status,
        message: errorBody.error,
        severity: response.status,
      }
    }

    return await response.json()
  } catch (error: any) {
    console.error('Request error:', error)
    throw error
  }
}

// Define HTTP methods using the utility function
export const post = (props: FetchDataProps) => request('POST', props)
export const get = (props: FetchDataProps) => request('GET', props)
export const put = (props: FetchDataProps) => request('PUT', props)
export const remove = (props: FetchDataProps) => request('DELETE', props) // 'delete' is a reserved keyword
