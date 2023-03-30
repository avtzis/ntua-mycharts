const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let creditOptions = new Schema({
    amount: Number,
    price: Number
});

const creditOptionsModel = mongoose.model("CreditOptions", creditOptions);


module.exports = creditOptionsModel;