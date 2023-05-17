const exporter = require('highcharts-export-server');
const path = require('path');
const fs = require('fs');

module.exports = (type, options) => new Promise((resolve, reject) => {
  exporter.export({
    type,
    options,
    width: 1080
  }, (err, result) => {
    if(err) {
      throw reject({type, status: 'fail', err});
    }

    let data;
    if(type === 'png') {
      data = new Buffer.from(result.data, 'base64');
    } else {
      const dataPath = path.join(__dirname, '../export-service', result.filename);
      data = fs.readFileSync(dataPath);
      fs.unlink(dataPath, error => reject({type, status: 'fail', error}));
    }

    resolve({type, status: 'success', data});
  })
})