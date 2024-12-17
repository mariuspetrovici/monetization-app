import { create } from 'zustand'

import * as apiService from '../services/apiService'

import { UserStore } from '../models/store/user'

export const useUserStore = create<UserStore>((set, get) => ({
  token: '',
  user: null,
  error: {
    message: '',
    status: '',
  },
  isAuthenticated: false,
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
  login: async ({ email, password }) => {
    const { setLoading, setUser, setToken, setError } = get()

    try {
      const response = await apiService.post({
        path: `login`,
        payload: { email, password },
        tokenRequired: false,
      })

      if (response) {
        setToken(response.token)
        setUser(response.user)

        return true
      }

      return false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)

      return false
    } finally {
      setLoading(false)
    }
  },
  logout: async () => {
    const { setLoading, setUser, setToken, setError } = get()

    try {
      const response = await apiService.post({
        path: `logout`,
      })

      if (response) {
        setToken(null)
        setUser(null)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  },
}))
