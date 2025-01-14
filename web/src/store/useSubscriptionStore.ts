import { create } from 'zustand'

import * as apiService from '../services/apiService'

import { SubscriptionStore } from '../models/store/subscriptions'
import { useUserStore } from './useUserStore'
import { useCoursesStore } from './useCoursesStore'

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscriptions: [],
  error: {
    message: '',
    status: '',
  },
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  setSubscriptions: (subscriptions) => set(() => ({ subscriptions })),
  getSubscriptions: async () => {
    const { setLoading, setSubscriptions, setError } = get()

    try {
      const response = await apiService.get({
        path: `subscriptions`,
      })

      if (response) {
        setSubscriptions(response)
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
  updateUserSubscription: async ({ userId, subscriptionId }) => {
    const { setLoading, setError } = get()
    const { getCourses } = useCoursesStore.getState()
    const { user, setUser } = useUserStore.getState()
    if (!user) {
      return
    }

    try {
      const response = await apiService.post({
        path: `subscriptions/purchase`,
        payload: { userId, subscriptionId },
      })

      if (response) {
        setUser({ ...user, subscription: response.subscription })
        getCourses()
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
}))
