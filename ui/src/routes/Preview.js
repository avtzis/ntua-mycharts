import { Container, Paper } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'

import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';

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

const Preview = () => {
  const data = useLoaderData();
  const options = data.preview['options'];

  return (
    <Container maxWidth='xl' sx={{pt: 3}}>
      <Paper variant='elevation' sx={{height: 750}}>
      <HighchartsReact highcharts={highcharts} options={{...options, chart:{...options.chart, height: 750, width: 1490}}} />
      </Paper>
    </Container>
  )
}

export default Preview