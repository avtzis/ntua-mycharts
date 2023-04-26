import { Box, Container, Link, Paper, Typography, CircularProgress } from '@mui/material'
import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';
import api from '../utilities/api'
import fileDownload from 'js-file-download';

import dependencywheel from 'highcharts/modules/dependency-wheel'
import wordcloud from 'highcharts/modules/wordcloud'
import networkgraph from 'highcharts/modules/networkgraph'
import organizations from 'highcharts/modules/organization'
import sankey from 'highcharts/modules/sankey'

sankey(highcharts);
dependencywheel(highcharts);
wordcloud(highcharts);
networkgraph(highcharts);
organizations(highcharts);

const types = [
  {id: 'line', name: 'Line'},
  {id: 'area', name: 'Area'},
  {id: 'column', name: 'Column'},
  {id: 'pie', name: 'Pie'},
  {id: 'dependencywheel', name: 'Dependency-Wheel'},
  {id: 'networkgraph', name: 'Network-Graph'},
  {id: 'wordcloud', name: 'Word-Cloud'},
  {id: 'organization', name: 'Organization'},
  {id: 'polar', name: 'Polar-Radar'},
]

const ChartPreview = ({ noCsv }) => {
  const [type, setType] = React.useState(types[0]);
  const [options, setOptions] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${api}/chart/preview?type=${type.id}`).then(response => {
      setOptions(response.data.preview.options);
      setLoading(false);
    }).catch(error => {
      console.error(error);
    })
  }, [type]);

  const handleChange = index => {
    setLoading(true);
    setType(types[index]);
  }

  const handleDownload = () => {
    axios.get(`${api}/chart/template?type=${type.id}`, {
      responseType: 'blob'
    }).then(response => {
      fileDownload(response.data, `template-${type.id}.csv`)
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <React.Fragment>
      <Container sx={{width: 800, pb: 4}}>
        <Paper variant='outlined'>
          <Box sx={{height: 500}}>
            <Carousel autoPlay={false} animation='slide' onChange={now => handleChange(now)}>
              {types.map((t, index) => {
                return (loading ? 
                  <Box key={index} sx={{width: 750, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress />
                  </Box>
                  :
                  <HighchartsReact key={index} highcharts={highcharts} options={{...options, chart:{...options.chart, height: 500, width: 750}}} />
                )
              })}
            </Carousel>
          </Box>
        </Paper>
      </Container>
      {noCsv || <Typography variant='h6' align='center'>
        <Link href='#' onClick={handleDownload}>Download</Link>
        {` chart description template for ${type.name} Chart`}
      </Typography>}
    </React.Fragment>
  )
}

export default ChartPreview