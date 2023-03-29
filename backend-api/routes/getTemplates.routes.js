const templateModel  = require("../models/template.models");


module.exports =  async (req, res) => {
     const allTemplates = await templateModel.find({});
     return res.json(allTemplates);
 };