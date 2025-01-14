import { Box, Container, Typography } from '@mui/material'

import CoursesList from '../../components/CoursesList'
import CourseCarousel from '../../components/Carousel'
import CoursePreview from '../../components/CoursePreview'
import SuggestedCourses from '../../components/SuggetsedCourses'
import { useCoursesStore } from '../../store/useCoursesStore'
import { useEffect } from 'react'
import { useSubscriptionStore } from '../../store/useSubscriptionStore'
import { useUserStore } from '../../store/useUserStore'

const suggestedCourses = [
  { id: '3', title: 'TypeScript Basics' },
  { id: '4', title: 'Full-Stack Development' },
]

const Courses = () => {
  const { courses } = useCoursesStore()
  const { user } = useUserStore()
  const { subscriptions, getSubscriptions } = useSubscriptionStore()

  useEffect(() => {
    if (!subscriptions.length) {
      getSubscriptions()
    }
  }, [])

  console.log('USER SUBSCRIPTION: ', user?.subscription)

  return (
    <Box>
      {/* <Stack direction={'row'} justifyContent={'center'}> */}
      <CoursesList />
      <div>
        {/* <Header /> */}
        <Container>
          <CourseCarousel />
          <Typography variant='h4' sx={{ marginTop: '2rem' }}>
            Course Previews
          </Typography>
          {courses.map((course) => (
            <CoursePreview key={course.id} course={course} />
          ))}
          <SuggestedCourses suggestions={suggestedCourses} />
        </Container>
      </div>
      {/* </Stack> */}
    </Box>
  )
}

export default Courses
