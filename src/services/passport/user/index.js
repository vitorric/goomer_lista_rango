module.exports = () => {
  const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    { getUserRepositoryById, getUserRepositoryByEmail } = require('../../../repositories/user'),
    { getMD5 } = require('../../../utils');

  passport.use('userClientAuth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async(payload,done) => {
    if (!payload.auth)
      return done(null, false);

    const user = await getUserRepositoryById(payload.auth._id);

    if(!user){
      return done(null, false);
    }

    if (user.delete || !user.status) {
      return done(null, false);
    }

    done(null, user);
  }));

  passport.use('userClient', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, async (req, email, password, done) => {

    try {
      const user = await getUserRepositoryByEmail(email);

      if (!user){
        return done(null, null);
      }

      const encryptedPassword = getMD5(password);

      const isMatch = encryptedPassword === user.password;

      if (!isMatch){
        return done(null, null);
      }

      done(null, user);
    } catch (error) {
      done(error.message, false);
    }
  }));

  return passport;
};