const { Produto } = require('../../schemas/produto'),
  { ObjectIdCast } = require('../../utils');


exports.criarProdutoRepository = async produto => {
  try {
    return Produto.create(produto).catch(error => console.log(error));
  } catch (error) {
    console.log('Error in criarProdutoRepository: ', error);
  }
};

exports.obterProdutoRepository = produtoId => {
  try {
    return Produto.aggregate([{
      $match: {
        _id: ObjectIdCast(produtoId),
      }
    }, {
      $project: {
        nome: 1,
        foto: 1,
        preco: 1,
        categoria: 1,
        promocoes: 1
      }
    }]).exec();
  } catch (error) {
    console.log('Error in obterProdutoRepository: ', error);
  }
};

exports.listarProdutosRepository = () => {
  try {
    return Produto.find({}).exec();
  } catch (error) {
    console.log('Error in listarProdutoRepository: ', error);
  }
};

exports.listarProdutosPaginacaoRepository = (restauranteId, nome, categoria, page, pageSize) => {
  try {
    return Produto.aggregate([{
      $match: {
        restauranteId: ObjectIdCast(restauranteId),
        nome: {
          $regex: `${nome}`,
          $options: 'si'
        },
        categoria: {
          $regex: `${categoria}`,
          $options: 'si'
        },
      }
    },
    {
      $project: {
        nome: 1,
        foto: 1,
        preco: 1,
        categoria: 1,
        promocoes: 1
      }
    },
    {
      $sort: { nome: 1 }
    },
    {
      $facet: {
        metadata: [{ $count: 'total' }, { $addFields: { page: page } }],
        produtos: [
          { $skip: (pageSize * (page - 1)) },
          { $limit: pageSize }
        ]
      }
    },
    {
      $unwind: '$metadata'
    }]).exec();
  } catch (error) {
    console.log('Error in listarProdutosPaginacaoRepository: ', error);
  }
};

exports.alterarProdutoRepository = (produtoId, nome, foto, preco, categoria, promocoes) => {
  try {
    return Produto.updateOne({
      _id: ObjectIdCast(produtoId)
    },
    {
      $set: {
        nome,
        foto,
        preco,
        categoria,
        promocoes
      }
    }).exec();
  } catch (error) {
    console.log('Error in alterarProdutoRepository: ', error);
  }
};

exports.deletarProdutoRepository = (produtoId) => {
  try {
    return Produto.deleteOne({
      _id: ObjectIdCast(produtoId)
    }).exec();
  } catch (error) {
    console.log('Error in deletarProdutoRepository: ', error);
  }
};