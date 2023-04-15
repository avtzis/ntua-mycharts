const Chart = require("../models/Chart");
const User = require("../models/User");
const exporter = require('highcharts-export-server');
const exportChart = require("../utilities/exportChart");
const exportHtml = require("../utilities/exportHtml");

exports.postValidate = async (req, res) => {
  const options = req.options;

  //validate
  let error = undefined;
  if(error) {
    return res.status(400).json({message: 'invalid options', valid: false});
  }

  return res.status(200).json({message: 'Chart valid', valid: true, options});
}

exports.postChart = async (req, res) => {
  const userId = req.userId;
  const options = req.body.options;

  const user = await User.findById(userId);
  if(!user.credits) {
    return res.status(400).json({message: 'not enough credits'});
  }

  exporter.initPool();
  Promise.all([
    exportChart('png', options),
    exportChart('pdf', options),
    exportChart('svg', options),
    exportHtml(options)
  ]).then(charts => {
    exporter.killPool();
    const chart = new Chart({ 
      user: userId, 
      type: options.chart.type ? options.chart.type : 'line', 
      name: options.title.text, 
      createdOn: new Date(),
      options
    });
    charts.forEach(chartObj => chart[chartObj.type] = chartObj.data);
    chart.save().then(() => {
      --user.credits;
      user.save();
      res.status(201).json({message: 'success'});
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json({message: 'internal server error'});
  })
}

exports.getTemplates = async (req, res) => {
  //
}

exports.getChart = async (req, res) => {
  const userId = req.userId;
  const chartId = req.params.id;
  const type = req.query.type;

  if(!type || type !== 'pdf' && type !== 'png' && type !== 'svg' && type !== 'html') {
    return res.status(400).json({message: 'no type specified'});
  }

  const chart = await Chart.findOne({ _id: chartId, user: userId});
  if(!chart) {
    return res.status(400).json({message: 'no such chart'});
  }

  const file = chart[type];
  return res.status(200).send(file);
}