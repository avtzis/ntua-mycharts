const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema;

let user = new Schema(
    {
        //_id
        lastLogin: Date,
        credits:Number,
        googleId:String,

    }, {
        timestamps: true
    }
);

user.plugin(findOrCreate);
const model = mongoose.model("User", user);

module.exports = model;
