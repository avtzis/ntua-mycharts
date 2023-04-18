import React from 'react'
import { Container, Paper, Box, Typography, LinearProgress, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Backdrop, CircularProgress } from '@mui/material'
import csvIcon from '../icons/csv-file-icon.svg'
import ClearIcon from '@mui/icons-material/Clear';
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import api from '../utilities/api';
import axios from 'axios';
import MyAlert from './MyAlert';
import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';

let message = '';
let severity = 'error';

const DropFile = ({ onChangeMode }) => {
  const [uploaded, setUploaded] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [options, setOptions] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [{isOver}, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item) {
      const file = item.files[0];
      if(file.type === 'text/csv') {
        handleFile(file);
      } else {
        message = 'Wrong file type. Please drop a csv file.';
        severity = 'error';
        setOpenAlert(true);
      }
    },
    collect: monitor => {
      return {isOver: monitor.isOver()}
    }
  });

  const triggerAlert = (msg, sev) => {
    message = msg;
    severity = sev;
    setOpenAlert(true);
  }

  const handleFile = file => {
    setFile(file);
    setFilename(file['name']);
    setUploaded(true);
    setProgress(0);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }

  const handleFileUpload = event => {
    if(!event.target.files) return;

    const file = event.target.files[0];
    handleFile(file);
  };

  const handleAbort = () => {
    setFile(null);
    setFilename('');
    setUploaded(false);
  };

  const handlePreview = () => {
    if(file) {
      const formData = new FormData();
      formData.append('file', file);
      axios.post(`${api}/chart/validate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        const myOptions = response.data.options;
        setOptions(myOptions);
        triggerAlert(response.data.message, 'success');
        setPreview(
          <HighchartsReact highcharts={highcharts} options={{...myOptions, chart:{...myOptions.chart, height: 500, width: 800}}} />
        );
        onChangeMode(true);
      }).catch(err => {
        console.error(err);
        triggerAlert(err.response.data.message);
      })
    }
  };

  const handleDiscard = () => {
    setPreview(null);
    onChangeMode(false);
    setOptions(null);
    triggerAlert('Chart discarded', 'info');
  };

  const handleCreate = () => {
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleConfirm = () => {
    setOpenBackdrop(true);
    axios.post(`${api}/chart/create`, {
      options,
    }).then(response => {
      triggerAlert(response.data.message, 'success');
      window.location.href = '/dashboard';
    }).catch(error => {
      console.error(error);
      triggerAlert(error.response.data.message);
    })
  }

  return (
    <React.Fragment>
      <Backdrop open={openBackdrop} sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <MyAlert open={openAlert} severity={severity} message={message} handleClose={() => setOpenAlert(false)} />
      {!preview ?
        <React.Fragment>
          <Container maxWidth='xs' sx={{p: 2}}>
            <Paper ref={drop} variant='outlined' sx={{border: (isOver ? '2px solid grey' : '2px dashed lightgrey'), py: 2}}>
              <Typography variant ='h2' align='center'>
                <FileUploadOutlinedIcon fontSize='large' />
              </Typography>
              <Typography variant='h6' align='center'>
                Drag and drop your csv file
              </Typography>
              <Typography align='center'>
                or
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'center', p: 1}}>
                <Button variant='outlined' component='label'>
                  Browse Files
                  <input type='file' accept='.csv' hidden onChange={handleFileUpload} />
                </Button>
              </Box>
            </Paper>
          </Container>
          {uploaded ? 
            <React.Fragment>
              <Container maxWidth='xs'>
                <Paper variant='outlined' sx={{p: 2}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{width: 55, display: 'flex', flexDirection: 'column'}}>
                      <img src={csvIcon} alt='csv' style={{width: 50}} />
                    </Box>
                    <Box sx={{width: '100%', pl: 2}}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pb: 1}}>
                        <Typography>
                          {filename}
                        </Typography>
                        <IconButton onClick={handleAbort} size='small'>
                          <ClearIcon />
                        </IconButton>
                      </Box>
                      <LinearProgress variant='determinate' value={progress} sx={{height: 20, borderRadius: 5}} />
                    </Box>
                  </Box>
                </Paper>
              </Container>
            </React.Fragment>
            :
            <React.Fragment />
          }
          <Container maxWidth='xs' sx={{p: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Button variant='outlined' href='/dashboard'>
              Back
            </Button>
            <Button variant='contained' onClick={handlePreview} disabled={(progress !== 100) || !file}>
              Preview
            </Button>
          </Container>
        </React.Fragment>
        :
        <React.Fragment>
          <Container maxWidth='md' sx={{pt: 2}}>
            <Paper variant='outlined'>
              <Box sx={{height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {preview}
              </Box>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'space-between', pt: 3}}>
              <Button variant='outlined' onClick={handleDiscard}>
                Discard
              </Button>
              <Button variant='contained' onClick={handleCreate}>
                Create
              </Button>
            </Box>
          </Container>
        </React.Fragment>
      }
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby='confirm-title' aria-describedby='confirm-description'>
        <DialogTitle id='confirm-title'>
          Please confirm your transaction
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to create this chart? You will be charged 1 credit from your available credits. The transaction will not be completed if you have no available credits.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          <Button onClick={handleConfirm}>COnfirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DropFile