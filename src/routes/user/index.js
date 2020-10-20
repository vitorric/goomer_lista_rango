const router = require('express').Router(),
  passport = require('passport'),
  passportUser = passport.authenticate('userClientAuth', {session: false});

module.exports = () => {

  // Rotas Restaurante
  router.post('/restaurante/criar', passportUser, require('./restaurante/criar')());
  router.post('/restaurante/obter', passportUser, require('./restaurante/obter')());
  router.post('/restaurante/listar', passportUser, require('./restaurante/listar')());
  router.get('/restaurante/listar', passportUser, require('./restaurante/listar-todos')());
  router.delete('/restaurante/deletar', passportUser, require('./restaurante/deletar')());
  router.put('/restaurante/alterar', passportUser, require('./restaurante/alterar')());

  // Rotas Produto
  router.post('/produto/criar', passportUser, require('./produto/criar')());
  router.post('/produto/obter', passportUser, require('./produto/obter')());
  router.post('/produto/listar', passportUser, require('./produto/listar')());
  router.get('/produto/listar', passportUser, require('./produto/listar-todos')());
  router.delete('/produto/deletar', passportUser, require('./produto/deletar')());
  router.put('/produto/alterar', passportUser, require('./produto/alterar')());

  // Rotas GridFS
  router.post('/gridfs/get', passportUser, require('./gridfs/get')());

  return router;
};