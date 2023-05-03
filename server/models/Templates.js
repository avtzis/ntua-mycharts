const mongoose = require('mongoose');
const findOrCreate=require('mongoose-findorcreate')


const templates=new mongoose.Schema({
    csv:Buffer,
    type:String
});
 templates.plugin(findOrCreate);
 module.exports=Templates=mongoose.model('template',templates)