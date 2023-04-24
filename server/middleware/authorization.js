const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) {
    return res.status(403).json({message: 'not token'});
  }

  try {
    const data = jwt.verify(token, 'secret');
    req.userId = data.userId;
    next();
  } catch(error) {
    return res.status(403).json({message: 'invalid token', error});
  }
};