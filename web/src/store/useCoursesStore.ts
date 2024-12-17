import { create } from 'zustand'

import * as apiService from '../services/apiService'

import { CoursesStore } from '../models/store/courses'

export const useCoursesStore = create<CoursesStore>((set, get) => ({
  courses: [],
  newCourse: { title: '', description: '', pages: [] },
  isLoading: false,
  isEditing: false,
  error: {
    message: '',
    status: '',
  },
  currentCourse: { id: '', title: '', description: '', pages: [], allContent: [] },
  setError: (error) => set(() => ({ error })),
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
  setNewCourse: (value) => set(() => ({ newCourse: value })),
  setCourses: (courses) => set(() => ({ courses })),
  setCurrentCourse: (currentCourse) => set(() => ({ currentCourse })),
  getCurrentCourse: async (id) => {
    const { isLoading, setError, setCurrentCourse, setIsLoading } = get()

    if (isLoading) {
      return false
    }

    setIsLoading(true)

    try {
      const response = await apiService.get({
        path: `courses/${id}`,
      })

      if (response) {
        setCurrentCourse(response || null)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  },
  getCourses: async () => {
    const { isLoading, setError, setCourses, setIsLoading } = get()

    if (isLoading) {
      return false
    }

    setIsLoading(true)

    try {
      const response = await apiService.get({
        path: `courses`,
      })

      if (response) {
        setCourses(response || [])
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  },
  createCourse: async (payload) => {
    const { isLoading, courses, setError, setCourses, setIsLoading } = get()

    if (isLoading) {
      return false
    }

    setIsLoading(true)

    try {
      const response = await apiService.post({
        path: `courses`,
        payload,
      })

      if (response) {
        setCourses([...courses, response.course])
      }

      return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
      return false
    } finally {
      setIsLoading(false)
    }
  },
  updateCourse: async (payload) => {
    const { isLoading, courses, setError, setCourses, setIsLoading } = get()

    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await apiService.put({
        path: `courses/${payload.id}`,
        payload: {
          title: payload.title,
          description: payload?.description || [],
          pages: payload.pages,
        },
      })

      if (response) {
        setCourses(
          courses.map((course) => {
            if (course.id === response.id) {
              return response
            }

            return course
          }),
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  },
  deleteCourse: async (courseId) => {
    const { isLoading, courses, setError, setCourses, setIsLoading } = get()

    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await apiService.remove({
        path: `projects/${courseId}`,
      })

      if (response) {
        setCourses(courses.filter((course) => course.id !== courseId))
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  },
}))
