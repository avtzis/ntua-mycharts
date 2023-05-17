const Chart = require("../models/Chart");

exports.getChart = async (req, res) => {
  const userId = req.userId;
  const chartId = req.params.id;
  const type = req.query.type;

  if(!type || type !== 'pdf' && type !== 'png' && type !== 'svg' && type !== 'html') {
    return res.status(400).json({message: 'no valid type specified'});
  }

  const chart = await Chart.findOne({ _id: chartId, user: userId});
  if(!chart) {
    return res.status(400).json({message: 'no such chart'});
  }

  const file = chart[type];
  return res.status(200).send(file);
}