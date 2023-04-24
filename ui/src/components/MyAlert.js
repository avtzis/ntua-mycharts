import { Alert, Snackbar } from '@mui/material';
import React from 'react'

const MyAlert = (props) => {
	const {open, handleClose, severity, message} = props;

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
			<Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
				{message}
			</Alert>
		</Snackbar>
  )
}

export default MyAlert