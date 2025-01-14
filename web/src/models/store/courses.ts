export interface Page {
  id: string
  body: string
  courseId: string
  pageNr: number
}

export interface Course {
  id: string
  title: string
  description: string
  pages: Page[]
  body: Page[]
  previewImage: string
  previewBody: string | null
}

export interface ErrorProps {
  message: string
  status: string
}

export interface NewCourse {
  id?: string
  title: string
  description?: string
  pages?: Page[]
}

export interface CoursesStore {
  courses: Course[]
  newCourse: NewCourse
  isLoading: boolean
  isEditing: boolean
  error: ErrorProps
  currentCourse: Course
  setError: ({ message, status }: ErrorProps) => void
  setIsEditing: (value: boolean) => void
  setIsLoading: (value: boolean) => void
  setNewCourse: (course: NewCourse) => void
  setCurrentCourse: (course: Course) => void
  getCurrentCourse: (course: string) => void
  setCourses: (courses: Course[]) => void
  getCourses: () => void
  createCourse: (course: NewCourse) => void
  updateCourse: (course: Course) => void
  deleteCourse: (id: string) => void
}
