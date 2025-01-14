import Carousel from 'react-material-ui-carousel'
import { Paper, Typography } from '@mui/material'

const courses = [
  { id: '1', title: 'Course 1', coverImage: '/path/to/image1.jpg' },
  { id: '2', title: 'Course 2', coverImage: '/path/to/image2.jpg' },
  { id: '3', title: 'Course 3', coverImage: '/path/to/image3.jpg' },
]

const CourseCarousel = () => {
  return (
    <Carousel>
      {courses.map((course) => (
        <Paper key={course.id} sx={{ textAlign: 'center' }}>
          {/* <img src={course.coverImage} alt={course.title} style={{ maxWidth: '100%', height: 'auto' }} /> */}
          <Typography variant='h6'>{course.title}</Typography>
        </Paper>
      ))}
    </Carousel>
  )
}

export default CourseCarousel
