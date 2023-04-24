const {parse} = require("csv-parse/sync");

const transpose = arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = tmp;
        }
    }
}

module.exports = async (req,res,next) =>{
    const csvStr = req.file.buffer.toString();


    const rawData = parse(csvStr, {
        skip_empty_lines: true
    });

    let options = {};
    const [attributes,values] = [rawData[1],rawData[2]];

    //make an object according to the attributes
    for(let i in attributes){
        const attribute = attributes[i];

        if(attribute === '') continue;

        const value = values[i];
        let atts = attribute.split(".");

        let objRef = options;

        for(let [i,attName] of atts.entries()){
            if(!(attName in objRef)) objRef[attName] = {};

            if(atts.length - 1 === i){
                objRef[attName] = value;
            }else {
                objRef = objRef[attName];
            }
        }
    }

    let series = rawData.slice(3);


    transpose(series)

    let resSeries =[];
    for(let line of series){

        const check = line.find(el=>(el!== undefined && el !== "")) !== undefined;
        if(!check) continue;

        let data = {}
        data.name = line[0];

        data.data = line.slice(1).map(num=>{
            if(num === undefined) {
                return null;
            }

            return Number(num);
        });
        resSeries.push(data);
    }
    options.series = resSeries;



    req.options = options;
    next()
}
