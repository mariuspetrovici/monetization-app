import { ErrorProps } from './courses'
import { Subscription } from './subscriptions'

export interface UserStore {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  error: ErrorProps
  loading: boolean
  setLoading(loading: boolean): void
  setError: ({ message, status }: ErrorProps) => void
  login: ({ email, password }: { email: string; password: string }) => Promise<boolean>
  logout: () => void
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  progress: any
  subscription: Subscription
}
