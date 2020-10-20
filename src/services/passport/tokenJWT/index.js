const JWT = require('jsonwebtoken');

exports.createLoginTokenJWT = (user) => {
  var exp = new Date();
  exp.setMinutes(exp.getMinutes() + 10);
  return JWT.sign({
    auth: user,
    exp: exp.getTime()
  },
  process.env.JWT_SECRET);
};