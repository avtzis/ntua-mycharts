import React from 'react'
import ChartPreview from '../components/ChartPreview'
import { Box } from '@mui/material'

const Previews = () => {
  return (
    <Box sx={{pt: 3}}>
      <ChartPreview noCsv={true} />
    </Box>
  )
}

export default Previews