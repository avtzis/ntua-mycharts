import React from 'react'
import { Container, Paper, Box, Typography, LinearProgress, IconButton, Button } from '@mui/material'
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
  const [load, setLoad] = React.useState(false);
  const [file, setFile] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [options, setOptions] = React.useState(null);

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
        message = response.data.message;
        severity = 'success';
        setOpenAlert(true);
        setPreview(
          <HighchartsReact highcharts={highcharts} options={{...myOptions, chart:{...myOptions.chart, height: 500, width: 800}}} />
        );
        onChangeMode(true);
      }).catch(err => {
        console.error(err);
        message = err.response.data.message
        severity = 'error';
        setOpenAlert(true);
      })
    }
  };

  const handleDiscard = () => {
    setPreview(null);
    onChangeMode(false);
    setOptions(null);
  };

  const handleCreate = () => {
    setOpenBackdrop(true);
    axios.post(`${api}/chart/create`, {
      options,
    }).then(response => {
      message = response.data.message;
      severity = 'success';
      setOpenAlert(true);
      window.location.href = '/dashboard';
    }).catch(error => {
      console.error(error);
      message = error.response.data.message;
      severity = 'error';
      setOpenAlert(true);
    })
  }

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
            <Button variant='contained' onClick={handlePreview} disabled={load || (progress !== 100) || !file}>
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
    </React.Fragment>
  )
}

export default DropFile