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

        // if (atts.length === 1) {
        //     data.
        // }

        for(let [i,attName] of atts.entries()){
            if(!(attName in objRef)) objRef[attName] = {};
            //console.log(options);
            if(atts.length - 1 === i){
                if (isNaN(value)) {objRef[attName] = value;}
                else {objRef[attName] = Number(value);}
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
    //console.log("Here:",chartType);
    //console.log(options);
    let series = rawData.slice(3);

    // if (chartType === 'line') {
    //
    // }
    if (chartType !== 'dependencywheel' && chartType !== 'networkgraph') {
        transpose(series);
    }


    let resSeries =[];
    let xAxisCategories = [];
    let keysArray = [];
    let pieNames = [];
    let pieYs= [];
    let lineNum = 0;
    let dataArrays = [];
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

            if (chartType === 'dependencywheel' || chartType === 'networkgraph'){
                if (lineNum === 0) {
                    if (chartType === 'dependencywheel'){
                    data.keys = line.map(l => {
                        const regex = /\(([^)]+)\)/;
                        const match = regex.exec(l);
                        //console.log("Check:", match[1]);
                        return match[1];
                    })
                    }
                    else{
                    //     options.plotOptions.networkgraph.push({
                    //         keys: line,
                    // })
                        //     networkgraph: {
                        //         keys: line,
                        //     }
                        // }
                        options.plotOptions = {
                            networkgraph: {
                                keys: line,
                            }
                        }
                                //options.plotOptions.networkgraph.keys =line
                    }
                    // const match = regex.exec(line[0]);
                    // const contentInParentheses = match[1];
                    // keysArray.push(contentInParentheses);

                }
                else {
                    //console.log("Check2:", line);
                    let line2 = line.map(l=>{
                        if (isNaN(l)) return l;
                        else return Number(l);
                    })
                    dataArrays.push(line2);
                }
            }
            else if (chartType === 'pie') {
                data.name = line[0];
                pieYs = line.slice(1);
                pieYs = pieYs.map(i =>{return Number(i)});
                //console.log("Ys:", pieYs);
            }
            else {data.name = line[0];}

            // if (chartType === 'pie') {
            //     pieOptions.push()
            //     data.data = pieOptions;
            // }
            if (chartType !== 'pie' && chartType !== 'dependencywheel' && chartType !== 'networkgraph') {
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
            //console.log("Yoohoo", data.keys);
            //resSeries.push(data);
        }
        if (chartType === 'dependencywheel' || chartType === 'networkgraph'){
            data.data = dataArrays;
        }
        lineNum++;
    }
    options.series = resSeries;
    //console.log(resSeries);

    req.options = options;
    next()
}