const { User } = require('../../schemas/user'),
  { ObjectIdCast } = require('../../utils');

exports.createUserRepository = async user => {
  return User.create(user).catch(error => {
    console.log('Error in criarProdutoRepository: ', error);
  });
};

exports.getUserRepositoryByEmail = email => {
  try {
    return User.findOne({ email }).exec();
  } catch (error) {
    console.log('Error in getUserRepositoryByEmail: ', error);
  }
};

exports.getUserRepositoryById = userId => {
  try {
    return User.findOne({ _id: ObjectIdCast(userId) }, {
      email: 1,
      name: 1,
      role: 1,
      status: 1,
      delete: 1
    }).exec();
  } catch (error) {
    console.log('Error in getUserRepositoryById: ', error);
  }
};