const { getUserRepositoryByEmail, getUserRepositoryById, createUserRepository } = require('../../../repositories/user'),
  { createLoginTokenJWT } = require('../../passport/tokenJWT'),
  { getMD5 } = require('../../../utils');

exports.createUser = async (user) => {
  if (!user.nome ||
      !user.email ||
      !user.password) {
    throw { msg: 'Informações faltantes' };
  }

  let userCreated = await getUserRepositoryByEmail(user.email);

  if (userCreated) {
    throw { msg: 'Usuário já cadastrado' };
  }

  user.password = getMD5(user.password);

  userCreated = await createUserRepository(user);

  const token = createLoginTokenJWT({ _id: userCreated._id });

  return {
    user: {
      nome: userCreated.nome,
      email: userCreated.email,
      role: userCreated.role
    },
    token
  };
};

exports.loginUser = async (user) => {
  const token = createLoginTokenJWT({ _id: user._id });

  return {
    user: {
      nome: user.nome,
      email: user.email,
      isValid: user.validateEmail,
      role: user.role
    },
    token
  };
};

exports.getUserById = async (userId) => {
  let user = await getUserRepositoryById(userId);
  return user;
};