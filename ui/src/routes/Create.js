import React from 'react'
import DropFile from '../components/DropFile'
import ChartPreview from '../components/ChartPreview'
import { Typography } from '@mui/material'

const Create = () => {
  return (
    <React.Fragment>
      <Typography variant='h2' align='center' sx={{py: 3}}>
        Let's create your own chart!
      </Typography>
      <ChartPreview />
      <DropFile />
    </React.Fragment>
  )
}

export default Create