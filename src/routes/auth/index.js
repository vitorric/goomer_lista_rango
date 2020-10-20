const router = require('express').Router(),
  passport = require('passport');

module.exports = () => {

  router.post('/create', require('./create')());

  router.post('/login', passport.authenticate('userClient', {session: false}),   require('./login')());

  return router;
};