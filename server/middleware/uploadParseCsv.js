const busboy = require('busboy');
const csv = require('fast-csv');

module.exports = async (req, res, next) => {
  let bb;
  try {
    bb = busboy({headers: req.headers});
  } catch(err) {
    return res.status(400).json({message: 'invalid file', error: err});
  }

  bb.on('file', (name, file, info) => {
    if(info['mimeType'] != 'text/csv') {
      return res.status(400).json({message: 'invalid file type'});
    }

    let options = [];
    file.pipe(csv.parse({headers: true})).on('data', row => {
      options.push(row);
    }).on('end', () => {
      req.options = options;
      next();
    }).on('error', error => {
      console.error(error);
      res.status(400).json({message: 'invalid file'});
    });
  });

  bb.on('close', () => {}); //?

  bb.on('error', error => {
    console.error(error);
    res.status(500).json({message: 'internal server error'});
  });

  req.pipe(bb);
}