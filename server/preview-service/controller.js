const Chart = require("../models/Chart");

exports.getPreviews = async (req, res) => {
  const type = req.query.type;

  const preview = await Chart.findOne({ type, preview: true }, 'options');
  if(!preview) return res.status(400).json({message: 'no such type'});

  return res.status(200).json({message: 'success', preview});
}