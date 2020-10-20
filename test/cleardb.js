const { User } = require('../src/schemas/user'),
  { Restaurante } = require('../src/schemas/restaurante'),
  { Produto } = require('../src/schemas/produto'),
  { mongoGridFSDB } = require('../src/conn/index');

module.exports = async ()  => {
  await User.deleteMany();
  await Restaurante.deleteMany();
  await Produto.deleteMany();
  await mongoGridFSDB.collection('fs.files').remove({});
  await mongoGridFSDB.collection('fs.chunks').remove({});
  return 'ok';
};