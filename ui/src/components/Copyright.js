import { Link, Typography } from '@mui/material'
import React from 'react'

const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' sx={{mt: 8, mb: 4}}>
      {'Copyright © '}
      <Link color='inherit' href='/about'>
        myCharts
      </Link>
      {' '}{new Date().getFullYear()}{'.'}
    </Typography>
  )
}

export default Copyright