const Templates=require('../models/Templates')
const fs =require('fs')
const path=require('path')

const datapath=path.join(__dirname,'../data',"chart-template-options-1.csv")
const csv1=fs.readFileSync(datapath)

const templates=[{
    type:'line',
    csv:csv1
}]

module.exports=async() =>{
    templates.forEach(template =>{
        Templates.findOrCreate(template,(err,data,created)=>{
            if (err){
                console.error(`There was an error finding or creating ${data.type} template`)
            } else{
                console.log(`${data.type} template has been ${created ? 'created sucessfully' : 'verified'}.`);
            }
        })
    })

}