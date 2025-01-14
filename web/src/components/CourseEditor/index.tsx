import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { TextField, Button, Typography, Card, CardContent } from '@mui/material'

import { useCoursesStore } from '../../store/useCoursesStore'

import { Page } from '../../models/store/courses'

import 'react-quill/dist/quill.snow.css'

const CourseEditor = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { currentCourse, setCurrentCourse, getCurrentCourse, updateCourse } = useCoursesStore()

  useEffect(() => {
    if (courseId) {
      getCurrentCourse(courseId)
    }
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCourse({ ...currentCourse, title: e?.target?.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCourse({ ...currentCourse, description: e?.target?.value })
  }

  const handleAddPage = () => {
    const newPage: Page = { id: Date.now().toString(), title: '', content: '' }
    setCurrentCourse({
      ...currentCourse,
      pages: [...(currentCourse?.body ? currentCourse.body : []), newPage],
    })
  }

  const handlePageChange = (index: number, field: keyof Page, value: string) => {
    const updatedPages = currentCourse?.body?.map((page, i) => (i === index ? { ...page, [field]: value } : page))
    setCurrentCourse({ ...currentCourse, body: updatedPages })
  }

  const handleSave = async () => {
    if (currentCourse.body?.length) {
      currentCourse.body?.forEach((page) => {})
    }

    updateCourse(currentCourse)
    // console.log('Course saved:', currentCourse)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant='h4'>Edit Course</Typography>
      <TextField
        label='Course Title'
        value={currentCourse.title}
        onChange={handleTitleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Description'
        value={currentCourse.description}
        onChange={handleDescriptionChange}
        fullWidth
        margin='normal'
        multiline
      />
      <Button
        variant='contained'
        color='secondary'
        onClick={handleSave}
        style={{ marginTop: '20px', marginLeft: '10px' }}>
        Save Course
      </Button>
      <Typography variant='h5' style={{ marginTop: '20px' }}>
        Pages
      </Typography>
      {currentCourse?.body?.map((page, index) => (
        <Card key={page.id} style={{ marginTop: '20px' }}>
          <CardContent>
            <TextField
              label='Page Title'
              value={page.title}
              onChange={(e) => handlePageChange(index, 'title', e.target.value)}
              fullWidth
              margin='normal'
            />
            <ReactQuill value={page.content} onChange={(value) => handlePageChange(index, 'content', value)} />
          </CardContent>
        </Card>
      ))}
      <Button variant='contained' color='primary' onClick={handleAddPage} style={{ marginTop: '20px' }}>
        Add Page
      </Button>
    </div>
  )
}

export default CourseEditor
