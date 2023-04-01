import React from 'react'
import { Container, Paper, Box, Typography, LinearProgress, IconButton, Button } from '@mui/material'
import csvIcon from '../icons/csv-file-icon.svg'
import ClearIcon from '@mui/icons-material/Clear';
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import api from '../utilities/api';
import axios from 'axios';
//import MyAlert from './MyAlert';

//let message = '';
//let severity = 'error';

const DropFile = () => {
  const [uploaded, setUploaded] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [load, setLoad] = React.useState(false);
  const [file, setFile] = React.useState({});
  //const [openAlert, setOpenAlert] = React.useState(false);

  const [{isOver}, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item) {
      const file = item.files[0];
      if(file.type === 'text/csv') {
        setFile(file);
        setFilename(file['name']);
        setUploaded(true);
        setProgress(0);
        setLoad(true);
      } else {}
    },
    collect: monitor => {
      return {isOver: monitor.isOver()}
    }
  });

  const handleFileUpload = event => {
    if(!event.target.files) return;

    const file = event.target.files[0];
    setFile(file);
    setFilename(file['name']);
    setUploaded(true);
    setProgress(0);
    setLoad(true);
  };

  const handleAbort = () => {
    setFile(null);
    setFilename('');
    setUploaded(false);
    setLoad(false);
  };

  const handleSubmit = () => {
    if(file) {
      const formData = new FormData();
      formData.append('file', file);
      axios.post(`${api}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        //message = response.data.message;
        //severity = 'success';
        //setOpenAlert(true);
      }).catch(err => {
        console.error(err);
        //message = err.response.data.message
        //severity = 'error';
        //setOpenAlert(true);
      })
    }
  };

  React.useEffect(() => {
    if(load) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if(oldProgress === 100) {
            setLoad(false);
          }
          const diff = Math.random() * 40;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }
  }, [load]);

  return (
    <React.Fragment>
      {/* <MyAlert open={openAlert} severity={severity} message={message} handleClose={() => setOpenAlert(false)} /> */}
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
          <Container maxWidth='xs' sx={{p: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Button variant='outlined'>
              Back
            </Button>
            <Button variant='contained' onClick={handleSubmit} disabled={load || (progress !== 100)}>
              Submit
            </Button>
          </Container>
        </React.Fragment>
        :
        <React.Fragment />
      }
    </React.Fragment>
  )
}

export default DropFile