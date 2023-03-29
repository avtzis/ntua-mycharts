const creditOptionsModel = require("../models/creditOptions.models");

module.exports =  async (req, res) => {
    const allCreditOptions = await creditOptionsModel.find({});
    return res.json(allCreditOptions);
};