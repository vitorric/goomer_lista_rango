const JWT = require('jsonwebtoken');

exports.createTokenJWT = (user, exp) => {
  return JWT.sign({
    auth: user,
    exp: exp.getTime()
  },
  process.env.JWT_SECRET);
};

exports.createLoginTokenJWT = (user) => {
  var exp = new Date();
  exp.setMinutes(exp.getMinutes() + 10);
  return JWT.sign({
    auth: user,
    exp: exp.getTime()
  },
  process.env.JWT_SECRET);
};

exports.decodeTokenJWT = (token) => {
  return JWT.decode(token, process.env.JWT_SECRET);
};