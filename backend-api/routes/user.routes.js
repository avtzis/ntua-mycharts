const User = require("../models/user.models");

module.exports =  async (req, res) => {
    return await res.json(User.findOne({_id:req.userId}));

};