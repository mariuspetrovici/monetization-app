import { ErrorProps } from './courses'

export interface SubscriptionStore {
  subscriptions: Subscription[]
  setSubscriptions: (subscriptions: Subscription[]) => void
  getSubscriptions: () => void
  updateUserSubscription: ({ userId, subscriptionId }: { userId?: string; subscriptionId?: string }) => void
  error: ErrorProps
  loading: boolean
  setLoading(loading: boolean): void
  setError: ({ message, status }: ErrorProps) => void
}

export interface Subscription {
  id: string
  name: string
  price: number
  durationDays: number
}
