import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'

import { useCoursesStore } from '../../store/useCoursesStore'

const CourseList = () => {
  const { courses, createCourse, getCourses } = useCoursesStore()
  const [openDialog, setOpenDialog] = useState(false)
  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [newCourseDescription, setNewCourseDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getCourses()
  }, [])

  const handleEditCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setNewCourseTitle('')
    setNewCourseDescription('')
  }

  const handleCreateCourse = () => {
    createCourse({ title: newCourseTitle })
    setOpenDialog(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button variant='contained' color='primary' onClick={handleOpenDialog} style={{ marginBottom: '20px' }}>
        Create New Course
      </Button>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant='h5'>{course.title}</Typography>
                <Typography>{course.description}</Typography>
                <Button variant='contained' color='primary' onClick={() => handleEditCourse(course.id)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <TextField
            label='Course Title'
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Description'
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
            fullWidth
            margin='normal'
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleCreateCourse} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CourseList
