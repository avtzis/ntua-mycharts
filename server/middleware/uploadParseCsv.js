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
                if (attName === "type" ) {
                    chartType = value;
                }
                else if (attName === "polar") {
                    chartType = 'polar';
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
    //console.log("help");
    //let firstLine = [];
    let firstLineLength=0;
    if (chartType !== 'dependencywheel' && chartType !== 'networkgraph' && chartType !== 'wordcloud' && chartType !== 'organization') {
        transpose(series);
    }
    else if (chartType === 'organization') {
         firstLineLength = series.map(value =>  value[0]).length;
         console.log("first line length:", firstLineLength);
        //console.log("First line:", firstLine);
    }

    let resSeries =[];
    let xAxisCategories = [];
    let keysArray = [];
    let pieNames = [];
    let pieYs= [];
    let lineNum = 0;
    let dataArrays = [];
    let polarData = [];
    let orgData = {};
    let polarAtts = [];
    let currentAtt = '';
    let innerAtts = [];
    let tempArray = [];
    for(let line of series){

        const check = line.find(el=>(el!== undefined && el !== "")) !== undefined;
        if(!check) continue;

        let data = {};
        if (line[0] === "Category") {
            if (chartType === 'pie') {
                pieNames = line.slice(1);
            }
            else if (chartType === 'wordcloud'){
                data.name = line[1];
            }
            else if (chartType ==='line' && line.slice(1)!==null) {
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
            if (chartType === 'dependencywheel' || chartType === 'networkgraph' || chartType === 'polar' || chartType === 'organization'){
                if (lineNum === 0 && chartType !== 'organization') {
                    if (chartType === 'dependencywheel'){
                    data.keys = line.map(l => {
                        const regex = /\(([^)]+)\)/;
                        const match = regex.exec(l);
                        //console.log("Check:", match[1]);
                        return match[1];
                    })
                    }
                    else if (chartType === 'polar') {
                        //const noEmptyStrings = line.filter((str) => str !== '');
                        polarAtts = line.filter((str) => str !== '');
                        console.log("Length of polar atts:", polarAtts.length);
                    }
                    // else if (chartType === 'organization') {
                    //     //polarAtts = firstLine;
                    // }
                    else if (chartType !=='networkgraph') {
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
                    let polarJSON = {};
                    if (chartType === 'polar'){
                        for (let i=0; i<polarAtts.length-1; i++) {
                            polarJSON[polarAtts[i]] = line[i];
                        }
                        polarJSON["data"] = line.slice(polarAtts.length-1).map(num =>{return Number(num)});
                        console.log("the JSON is:",polarJSON);
                        if (Object.keys(polarJSON).length !==0) polarData.push(polarJSON);
                        console.log("polarData is:", polarData);
                    }
                    else if (chartType === 'organization') {
                        if (line[0]!== '') {
                            // if (Object.keys(tempJSON).length !== 0) {
                            //     //polarJSON[currentAtt].push(tempJSON);
                            //     polarData.push(polarJSON);
                            // }
                            if (currentAtt!=='') orgData[currentAtt] = tempArray;
                            //if (Object.keys(polarJSON).length !==0) polarData.push(polarJSON[currentAtt]);
                            //tempJSON = {};
                            tempArray = [];
                            currentAtt = line[0];
                            console.log("Att:", currentAtt);
                            innerAtts=line.slice(1);
                            // polarJSON[currentAtt] = [];
                        }
                        else {
                            if (innerAtts.length === 0) {
                                //if (!polarJSON.hasOwnProperty(currentAtt))  polarJSON[currentAtt] = [];
                                if (currentAtt === 'keys') tempArray = line.slice(1);
                                else tempArray.push(line.slice(1));
                                console.log("temp array:", tempArray);
                                // console.log("lineslice1:", line.slice(1));
                                // polarJSON[currentAtt].push(line.slice(1)); // line[i];
                                // console.log("Here1", polarJSON[currentAtt]);
                            }
                            else {
                                //for (let i in line.slice(1)) {
                                    //if (!polarData.hasOwnProperty(currentAtt))  polarData[currentAtt] = [];
                                    //console.log("Here2", line[i]);
                                    // if (polarAtts[i] !== '') {
                                    //     currentAtt = polarAtts[i];
                                    //     innerAtts = line.slice(1);
                                    //     //continue} else
                                    // if (innerAtts.length === 0) {
                                    //     polarJSON[currentAtt] = line; // line[i];
                                    //     //console.log("Here1", polarJSON[currentAtt]);}
                                    //else
                                    //if (thisSession.hasOwnProperty("merchant_id"))
                                    //polarJSON[currentAtt] = [];
                                tempJSON = {};
                                    for (let j = 0; j < innerAtts.length; j++) {
                                        if (line[j+1]!=='' && line[j+1]!==undefined)
                                        tempJSON[innerAtts[j]] = line[j + 1];
                                    }
                                tempArray.push(tempJSON);
                                    //polarData[currentAtt].push(tempJSON);
                                    console.log("Here2:",  tempArray);
                                    // }
                                //}
                                //polarData.push(polarJSON);
                            }
                            if (lineNum === firstLineLength-1){ //&& Object.keys(tempJSON).length !== 0) {
                                //polarJSON[currentAtt].push(tempJSON);
                                orgData[currentAtt] = tempArray;
                                //polarData.push(polarJSON[currentAtt]);
                            }
                        }
                        //console.log("the JSON is:",polarJSON);
                        // polarData.push(polarJSON);
                        //console.log("polarData is:", polarData);
                    }
                    else {
                        //console.log("Check2:", line);
                        let line2 = line.map(l => {
                            if (isNaN(l)) return l;
                            else return Number(l);
                        })
                        dataArrays.push(line2);
                    }
                }
            }
            else if (chartType === 'pie') {
                data.name = line[0];
                pieYs = line.slice(1);
                pieYs = pieYs.map(i =>{return Number(i)});
                //console.log("Ys:", pieYs);
            }
            else if (chartType === 'wordcloud') {
                dataArrays.push(
                    {name:line[0], weight:line[1]});
            }
            else {data.name = line[0];}

            // if (chartType === 'pie') {
            //     pieOptions.push()
            //     data.data = pieOptions;
            // }
            if (chartType !== 'pie' && chartType !== 'dependencywheel' && chartType !== 'networkgraph' && chartType !== 'wordcloud' && chartType !== 'polar') {
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
            else if (chartType === 'pie') {
                let temp = [];
                if (pieNames.length!==0 && pieYs.length!==0) {
                    for (let i=0; i<pieNames.length; i++) {
                        temp.push({name:pieNames[i], y:pieYs[i]});
                    }
                    data.data = temp;
                }
            }
        }
        if (line[0] !== "Category" && chartType!=='polar'  && chartType!=='organization') { //data.name !== "Category"
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
        if (chartType === 'dependencywheel' || chartType === 'networkgraph' || chartType === 'wordcloud'){
            data.data = dataArrays;
        }
        if (chartType === 'polar' ) {
            resSeries = polarData;
            //console.log(resSeries);
        }
        if (chartType === 'organization'){
            let nullArray = [];
            nullArray.push(orgData);
            resSeries = nullArray;
        }
        lineNum++;
    }
    options.series = resSeries;
    //console.log(resSeries);

    req.options = options;
    console.log("Final object",options);
    next()
}