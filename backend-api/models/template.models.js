const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let template = new Schema(
    {
        photo: String,
        templateType: String,
        description: String,
        cost: Number
    }
);

const templateModel = mongoose.model("Template", template);

module.exports = templateModel;
