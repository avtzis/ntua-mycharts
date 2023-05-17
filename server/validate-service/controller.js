exports.postValidate = async (req, res) => {
  const options = req.options;

  //TODO: validate
  if(req.error) {
    return res.status(400).json({message: 'invalid options', valid: false});
  }
  return res.status(200).json({message: 'Chart valid', valid: true, options});

}