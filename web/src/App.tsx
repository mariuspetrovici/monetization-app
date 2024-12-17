import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import Courses from './pages/Courses'
import CourseEditor from './components/CourseEditor'
import LoginPage from './pages/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:courseId' element={<CourseEditor />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<></>} />
        <Route path='*' element={<Navigate to='/courses' replace />} />
      </Routes>
    </Router>
  )
}

export default App
