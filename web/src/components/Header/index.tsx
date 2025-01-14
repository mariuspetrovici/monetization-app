import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit'>Home</Button>
        <Button color='inherit'>Courses</Button>
        <Button color='inherit'>Profile</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
