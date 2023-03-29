const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema;

let user = new Schema(
    {
        //_id
        lastLogin: Date,
        credits:Number,
        googleId:String,
        email:String,
        name:String,
        avatar:String,

    }, {
        timestamps: true
    }
);

user.plugin(findOrCreate);
const model = mongoose.model("User", user);

module.exports = model;
