import { Box, Container, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';
import Carousel from 'react-material-ui-carousel'

import dependencywheel from 'highcharts/modules/dependency-wheel'
import wordcloud from 'highcharts/modules/wordcloud'
import networkgraph from 'highcharts/modules/networkgraph'
import organizations from 'highcharts/modules/organization'
import sankey from 'highcharts/modules/sankey'

import options1 from '../temp/chart-options1.json';
import options2 from '../temp/chart-options2.json';
import options3 from '../temp/chart-options3.json';
import options4 from '../temp/chart-options4.json';
import options5 from '../temp/chart-options5.json';
import options6 from '../temp/chart-options6.json';
import options7 from '../temp/chart-options7.json';
import options8 from '../temp/chart-options8.json';
import options9 from '../temp/chart-options9.json';

sankey(highcharts);
dependencywheel(highcharts);
wordcloud(highcharts);
networkgraph(highcharts);
organizations(highcharts);

const options = [options1, options2, options3, options4, options5, options6, options7, options8, options9];
const types = ['line', 'area', 'column', 'pie', 'dependency-wheel', 'network-graph', 'wordcloud', 'organization', 'polar'];

const ChartPreview = () => {
  const [type, setType] = React.useState(types[0]);

  return (
    <React.Fragment>
      <Container sx={{width: 800, pb: 4}}>
        <Paper variant='outlined'>
          <Box sx={{height: 500}}>
            <Carousel autoPlay={false} animation='slide' onChange={now => setType(types[now])}>
              {options.map((option, index) => (
                <HighchartsReact key={index} highcharts={highcharts} options={{...option, chart:{...option.chart, height: 500, width: 750}}} />
              ))}
            </Carousel>
          </Box>
        </Paper>
      </Container>
      <Typography variant='h6' align='center'>
        <Link href='#' onClick={null}>Download</Link>
        {` chart description template for ${type} chart`}
      </Typography>
    </React.Fragment>
  )
}

export default ChartPreview