// CourseForm.tsx
import React, { useState } from 'react'
import { Course, Page } from '../../models/store/courses'
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DeleteIcon from '@mui/icons-material/Delete'

interface CourseFormProps {
  initialCourse: Course | null
  onClose: () => void
  onSave: (course: Course) => void
}

const CourseForm: React.FC<CourseFormProps> = ({ initialCourse, onClose, onSave }) => {
  const [title, setTitle] = useState(initialCourse?.title || '')
  const [description, setDescription] = useState(initialCourse?.description || '')
  const [pages, setPages] = useState<Page[]>(initialCourse?.pages || [])

  const handleAddPage = () => {
    const newPage: Page = { id: Date.now().toString(), title: '', content: '' }
    setPages([...pages, newPage])
  }

  const handlePageChange = (index: number, field: keyof Page, value: string) => {
    const updatedPages = pages.map((page, i) => (i === index ? { ...page, [field]: value } : page))
    setPages(updatedPages)
  }

  const handleSave = () => {
    const newCourse: Course = { id: initialCourse?.id || Date.now().toString(), title, description, pages }
    onSave(newCourse)
  }

  const handleDeletePage = (index: number) => {
    const updatedPages = pages.filter((_, i) => i !== index)
    setPages(updatedPages)
  }

  return (
    <div>
      <DialogTitle>{initialCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
      <DialogContent>
        <TextField
          label='Course Title'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label='Course Description'
          fullWidth
          margin='normal'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        <Typography variant='h6' gutterBottom style={{ marginTop: '20px' }}>
          Pages
        </Typography>
        {Object.entries(pages).map((page, index) => (
          <Grid container spacing={2} key={page[1].id} style={{ marginBottom: '10px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Page Title'
                fullWidth
                value={page[1].title}
                onChange={(e) => handlePageChange(index, 'title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactQuill
                value={page[1].content}
                onChange={(content) => handlePageChange(index, 'content', content)}
                placeholder='Page Content'
                theme='snow'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconButton onClick={() => handleDeletePage(index)} aria-label='delete'>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button onClick={handleAddPage} variant='contained' color='secondary' style={{ marginTop: '10px' }}>
          Add Page
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary' variant='contained'>
          Save Course
        </Button>
      </DialogActions>
    </div>
  )
}

export default CourseForm
