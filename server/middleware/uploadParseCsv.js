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
        skip_empty_lines: true,
        relax_column_count:true
    });

    let options = {};
    const [attributes,values] = [rawData[1],rawData[2]];

    //make an object according to the attributes
    let chartType = "line";
    for(let i in attributes){
        console.log(options);
        const attribute = attributes[i];

        if(attribute === '') continue;

        const value = values[i];
        let atts = attribute.split(".");
        let objRef = options;

        for(let [i,attName] of atts.entries()){
            if(!(attName in objRef)) objRef[attName] = {};
            console.log(options);
            if(atts.length - 1 === i){
                objRef[attName] = value;
                if (attName === "type") {
                    chartType = value;
                }
            }else {
                if (isNaN(objRef[attName])) {
                    objRef = objRef[attName];
                }
                else {objRef = Number(objRef[attName]);}
            }
        }
    }
    console.log("Here:",chartType);
    console.log(options);
    let series = rawData.slice(3);


    //if (chartType !== 'dependencywheel') {
        transpose(series);
    //}

    let resSeries =[];
    let xAxisCategories = [];
    let keysArray = [];
    let pieNames = [];
    let pieYs= [];
    for(let line of series){

        const check = line.find(el=>(el!== undefined && el !== "")) !== undefined;
        if(!check) continue;

        let data = {};
        if (line[0] === "Category") {
            if (chartType === 'pie') {
                pieNames = line.slice(1);
            }
            else if (line.slice(1)!==null) {
                xAxisCategories = line.slice(1);
            }
            // else if (chartType === 'column'){
            //
            // }
        }
        // if (line[0] === "Category") {
        //     data.name = "xAxis.categories";
        // }
        else {
            if (chartType === 'dependencywheel'){
                const regex = /\(([^)]+)\)/;
                const match = regex.exec(line[0]);
                const contentInParentheses = match[1];
                keysArray.push(contentInParentheses);
                console.log("Help:", keysArray);
            }
            else if (chartType === 'pie') {
                data.name = line[0];
                pieYs = line.slice(1);
            }
            else {data.name = line[0];}

            // if (chartType === 'pie') {
            //     pieOptions.push()
            //     data.data = pieOptions;
            // }
            if (chartType !== 'pie') {
                data.data = line.slice(1).map(num => {
                    if (num === undefined) {
                        return null;
                    }
                    if (data.name === "Category" || isNaN(num)) {//"xAxis.categories"
                        return num;
                    } else {
                        return Number(num);
                    }
                });
            }
            else {
                let temp = [];
                if (pieNames.length!==0 && pieYs.length!==0) {
                    for (let i=0; i<pieNames.length; i++) {
                        temp.push({name:pieNames[i], y:pieYs[i]});
                    }
                    data.data = temp;
                }
            }
        }
        if (line[0] !== "Category") { //data.name !== "Category"
            resSeries.push(data);
            //options.push(data);
        }
        // else
        // {resSeries.push(data);}
        if (xAxisCategories.length!==0){
        options.xAxis = {
            categories: xAxisCategories,
//         // accessibility: {
//         //     rangeDescription: "Range: " + xAxisCategories[0] + " to " + xAxisCategories[xAxisCategories.length - 1]
        };}
        if (keysArray.length!==0) {
            if (data.keys === undefined){data.keys = [];}
            data.keys = keysArray;
            console.log("Yoohoo", data.keys);
            //resSeries.push(data);
        }
    }
    options.series = resSeries;
    console.log(resSeries);

    req.options = options;
    next()
}