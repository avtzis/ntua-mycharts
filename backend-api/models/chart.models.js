const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chart = new Schema(
    {
        // file: ,
        chartName: String,
        save: Boolean,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        template: {
            type:mongoose.Schema.ObjectId,
            ref:'Template',
        },
    }, {
        timestamps: true
    }
);

const chartModel = mongoose.model("Chart", chart);

module.exports = chartModel;