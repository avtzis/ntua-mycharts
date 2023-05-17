const Chart = require('../models/Chart');
const User = require('../models/User');
const auth = require('../utilities/authentication');
const jwt = require('jsonwebtoken')

exports.getUser = async (req, res) => {
  const id = req.userId;

  const user = await User.findById(id);
  const charts = await Chart.find({ user: id }, 'type name createdOn options');

  return res.status(200).json({message: 'success', user, charts});
}

exports.postLogin = async (req, res) => {
  const googleToken = req.body.token;
  const user = await auth(googleToken);

  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '24h' });

  return res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    /* sameSite: 'strict' */
  }).status(200).json({message: 'Logged in successfully'});
};

exports.postLogout = async (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json({message: 'logout successful'});
}