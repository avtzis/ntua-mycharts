// Google Auth
const { OAuth2Client } = require('google-auth-library');

// Initialise Client
const CLIENT_ID = '370089780045-lc3htgodlbfcpv4d55jgadm7dofhn8m7.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Mongo User Model
const User = require('../models/user.models');
const jwt = require("jsonwebtoken");

const authentication = async (token) => {

  let ticket;
  try{
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
  } catch(error) {
    throw new Error("Invalid Token");
  }

  const payload = ticket.getPayload();

  const googleId = payload['sub'];
  const email = payload['email'];
  const name = payload['name'];
  const avatar = payload['picture']; //url - string

  let user = await User.findOne({ googleId: googleId });
  if(!user) {
    user = new User({ googleId, email, name, avatar});
  }
  await user.save();

  return user

};


const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.userId = data.userId;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = {authentication,authorization};