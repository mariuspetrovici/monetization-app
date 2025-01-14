import { useState } from 'react'
import { Modal, Button, Typography, Grid, Card, CardContent } from '@mui/material'

import { useUserStore } from '../../store/useUserStore'
import { useSubscriptionStore } from '../../store/useSubscriptionStore'

const SubscriptionModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { user } = useUserStore()
  const { subscriptions, updateUserSubscription } = useSubscriptionStore()

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleConfirm = () => {
    if (selectedPlan) {
      updateUserSubscription({ userId: user?.id, subscriptionId: selectedPlan })
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='subscription-modal'>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
        }}>
        <Typography variant='h5' gutterBottom>
          Choose Your Plan
        </Typography>
        <Grid container spacing={2}>
          {subscriptions.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub.id}>
              <Card
                onClick={() => handlePlanSelect(sub.id)}
                style={{
                  border: sub.id === selectedPlan ? '2px solid blue' : '1px solid #ccc',
                  cursor: 'pointer',
                }}>
                <CardContent>
                  <Typography variant='h6'>{sub.name}</Typography>
                  <Typography variant='body2'>Price: ${sub.price}</Typography>
                  <Typography variant='body2'>Duration: {sub.durationDays} days</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 10 }}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' disabled={!selectedPlan} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SubscriptionModal
