const Chart = require("../models/Chart");
const User = require("../models/User");
const exporter = require('highcharts-export-server');
const exportChart = require("../utilities/exportChart");
const exportHtml = require("../utilities/exportHtml");

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