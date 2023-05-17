const template = require("../models/Templates")
const types = ['line', 'area', 'column', 'pie', 'dependencywheel', 'networkgraph', 'wordcloud', 'organization', 'polar'];

exports.getTemplates = async (req, res) => {
  const type = req.query.type;

  if(!type || !types.find(element => element === type)) {
    return res.status(400).json({message: 'no valid type specified'});
  }
  
  const template1 = await template.findOne({ type});
  const file = template1['csv'];

  return res.status(200).send(file);
}