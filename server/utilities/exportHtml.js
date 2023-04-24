module.exports = options => {
  const data = `<script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
  
  <figure class="highcharts-figure">
      <div id="container"></div>
  </figure>
  
  <script type="text/javascript">
      Highcharts.chart('container', ${JSON.stringify(options)});
  </script>`;

  return {type: 'html', status: 'success', data}
}