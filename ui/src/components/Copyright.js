import { Link, Typography } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';

const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' sx={{mt: 8, mb: 4}}>
      {'Copyright © '}
      <Link color='inherit' href='/about'>
        myCharts
      </Link>
      {' '}{new Date().getFullYear()}{'.'}
      <GitHubIcon />
    </Typography>
  )
}

export default Copyright