import { Card, CardMedia, Typography, Box, Button } from '@mui/material'
import { Course } from '../../models/store/courses'
import SubscriptionModal from '../SubscriptionModal'
import { useState } from 'react'

const CoursePreview = ({ course }: { course: Course }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card sx={{ display: 'flex', margin: 2 }}>
      <CardMedia
        component='img'
        height='140'
        image={course.previewImage}
        alt={course.title}
        style={{ width: '200px' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>
        <Typography variant='h6'>{course.title}</Typography>
        {course && course.previewBody ? (
          <Typography variant='body2' color='text.secondary'>
            {course.previewBody}
          </Typography>
        ) : (
          <Button variant='contained' color='primary' onClick={() => setModalOpen(true)}>
            Upgrade to Access
          </Button>
        )}
      </Box>

      <SubscriptionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Card>
  )
}

export default CoursePreview
