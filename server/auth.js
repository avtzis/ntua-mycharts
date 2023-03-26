// Google Auth
const { OAuth2Client } = require('google-auth-library');

// Initialise Client
const CLIENT_ID = '370089780045-lc3htgodlbfcpv4d55jgadm7dofhn8m7.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Mongo User Model
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.cookies['token'];

  let ticket;
  try{
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
  } catch(error) {
    return res.status(401).json({ message: 'invalid token', error })
  }

  const payload = ticket.getPayload();
  const email = payload['email'];
  const name = payload['name'];
  const avatar = payload['picture']; //url - string

  let user = await User.findOne({ email });
  if(!user) {
    user = new User({ email, name, avatar });
    await user.save();
  }

  req.email = email;
  next();
}