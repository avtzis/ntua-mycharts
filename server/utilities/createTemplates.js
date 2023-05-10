const Templates = require("../models/Templates");
const fs = require("fs");
const path = require("path");

const types = [
  "line",
  "area",
  "column",
  "pie",
  "dependencywheel",
  "networkgraph",
  "wordcloud",
  "organization",
  "polar",
];

let import_csv = async (type, index) => {
  return new Promise((resolve, reject) => {
    datapath = path.join(
      __dirname,
      "../data",
      `chart-template-options-${index + 1}.csv`
    );

    const csv = fs.readFileSync(datapath);
    return resolve({ type: type, csv: csv });
  });
};

module.exports = async () => {
  Promise.all(types.map((type, index) => import_csv(type, index))).then(
    (templates) => {
      templates.forEach((template) => {
        Templates.findOrCreate({type:template.type}, (err, data, created) => {
          if (err) {
            console.error(
              `There was an error finding or creating ${data.type} template`
            );
          } else {
            data.csv = template.csv;
            data.save()
            console.log(
              `${data.type} template has been ${
                created ? "created sucessfully" : "updated"
              }.`
            );
          }
        });
      });
    }
  );
};
