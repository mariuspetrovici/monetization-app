import { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material'
import { useUserStore } from '../../store/useUserStore'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const { token, login, logout } = useUserStore()

  // Validation function
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  // Handle form submission
  const handleLogin = async (e: any) => {
    e.preventDefault()

    // Validate input fields
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    const success = await login({ email, password })

    if (success) {
      navigate('/')
    }
    // Reset error and form fields
    setError('')
  }

  useEffect(() => {
    if (token) {
      navigate('/')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <TextField
          label='Email'
          fullWidth
          variant='outlined'
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          fullWidth
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='contained' color='primary' fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  )
}

export default LoginPage
