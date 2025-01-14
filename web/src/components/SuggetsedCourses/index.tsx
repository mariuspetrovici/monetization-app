import { List, ListItem, ListItemText, Typography } from '@mui/material'

const SuggestedCourses = ({ suggestions }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography variant='h6'>Suggested Courses</Typography>
      <List>
        {suggestions.map((course) => (
          <ListItem key={course.id}>
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SuggestedCourses
