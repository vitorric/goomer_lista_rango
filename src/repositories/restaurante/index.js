const { Restaurante } = require('../../schemas/restaurante'),
  { ObjectIdCast } = require('../../utils');


exports.criarRestauranteRepository = async restaurante => {
  return Restaurante.create(restaurante).catch(error => {
    console.log('Error in criarRestauranteRepository: ', error);
  });
};

exports.obterRestauranteRepository = restauranteId => {
  try {
    return Restaurante.findOne({
      _id: ObjectIdCast(restauranteId),
    }, {
      nome: 1,
      endereco: 1,
      foto: 1,
      horarios_funcionamento: 1
    }).exec();
  } catch (error) {
    console.log('Error in obterRestauranteRepository: ', error);
  }
};

exports.listarRestaurantesRepository = () => {
  try {
    return Restaurante.find({}).exec();
  } catch (error) {
    console.log('Error in listarRestauranteRepository: ', error);
  }
};

exports.listarRestaurantesPaginacaoRepository = (nome, page, pageSize) => {
  try {
    return Restaurante.aggregate([{
      $match: {
        nome: {
          $regex: `${nome}`,
          $options: 'si'
        }
      }
    },
    {
      $project: {
        nome: 1,
        endereco: 1,
        foto: 1,
        horarios_funcionamento: 1
      }
    },
    {
      $sort: { nome: 1 }
    },
    {
      $facet: {
        metadata: [{ $count: 'total' }, { $addFields: { page: page } }],
        restaurantes: [
          { $skip: (pageSize * (page - 1)) },
          { $limit: pageSize }
        ]
      }
    },
    {
      $unwind: '$metadata'
    }]).exec();
  } catch (error) {
    console.log('Error in listarRestaurantesPaginacaoRepository: ', error);
  }
};

exports.alterarRestauranteRepository = (restauranteId, nome, foto, endereco, horarios_funcionamento) => {
  try {
    return Restaurante.updateOne({
      _id: ObjectIdCast(restauranteId)
    },
    {
      $set: {
        nome,
        foto,
        endereco,
        horarios_funcionamento
      }
    }).exec();
  } catch (error) {
    console.log('Error in alterarRestauranteRepository: ', error);
  }
};

exports.deletarRestauranteRepository = (restauranteId) => {
  try {
    return Restaurante.deleteOne({
      _id: ObjectIdCast(restauranteId)
    }).exec();
  } catch (error) {
    console.log('Error in deletarRestauranteRepository: ', error);
  }
};