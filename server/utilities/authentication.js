// Google Auth
const { OAuth2Client } = require('google-auth-library');

// Initialise Client
const CLIENT_ID = '370089780045-lc3htgodlbfcpv4d55jgadm7dofhn8m7.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Mongo User Model
const User = require('../models/User');

module.exports = async token => {
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
  } catch(error) {
    throw new Error('Invalid Token');
    return;
  }

  const payload = ticket.getPayload();

  const googleId = payload['sub'];
  const email = payload['email'];
  const name = payload['name'];
  const avatar = payload['picture']; //url - string

  let user = await User.findOne({ googleId });
  if(!user) {
    user = new User({ googleId, email, name, avatar, lastLogin: new Date() });
  }
  await user.save();

  return user;
}