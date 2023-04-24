import React from 'react'
import DropFile from '../components/DropFile'
import ChartPreview from '../components/ChartPreview'
import { Typography } from '@mui/material'

const Create = () => {
  const [previewMode, setPreviewMode] = React.useState(false);

  return (
    <React.Fragment>
      <Typography variant='h2' align='center' sx={{py: 3}}>
        { previewMode ? 'Your chart is ready!' : "Let's create your own chart!"}
      </Typography>
      { previewMode || <ChartPreview /> }
      <DropFile onChangeMode={setPreviewMode} />
    </React.Fragment>
  )
}

export default Create