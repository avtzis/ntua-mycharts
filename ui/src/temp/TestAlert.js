import { Alert, Snackbar } from '@mui/material';
import React from 'react'

const TestAlert = (props) => {
	const {open, handleClose, severity, message} = props;

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
			<Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
				{message}
			</Alert>
		</Snackbar>
  )
}

export default TestAlert