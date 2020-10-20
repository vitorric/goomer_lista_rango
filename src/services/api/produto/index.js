const { criarProdutoRepository, alterarProdutoRepository, deletarProdutoRepository,
    listarProdutosPaginacaoRepository, listarProdutosRepository, obterProdutoRepository } = require('../../../repositories/produto'),
  { obterRestauranteRepository } = require('../../../repositories/restaurante'),
  { salvarArquivoGridFS } = require('../../../repositories/gridFS'),
  { formatDate, projectRoot, removeUploadedFile, validarIntervalosDeHorario } = require('../../../utils');

exports.criarProduto = async (body, files) => {
  if (!body || !body.produto) {
    throw { msg: 'Informações faltantes' };
  }

  let { restauranteId, nome, foto, preco, categoria, promocoes } = JSON.parse(body.produto);

  if (!restauranteId || !nome || !preco || !categoria) {
    throw { msg: 'Informações faltantes' };
  }

  const restaurante = await obterRestauranteRepository(restauranteId);

  if (!restaurante) {
    throw { msg: 'Restaurante não cadastrado!' };
  }

  if (promocoes) {
    for (let i = 0; i < promocoes.length; i++) {
      if (preco < promocoes[i].preco) {
        throw { msg: 'O preço normal do produto não deve ser menor que um preço promocional' };
      }
      if (!promocoes[i].horario_inicio || !promocoes[i].horario_fim ||
          !validarIntervalosDeHorario(promocoes[i].horario_inicio, promocoes[i].horario_fim, 15)) {
        throw { msg: 'O intervalo mínimo para os horários de atendimento é de 15 minutos.' };
      }
    }
  }

  if (files !== null && typeof files !== 'undefined') {
    const fileName = await salvarArquivoGridFS(files.files);
    removeUploadedFile(`${projectRoot}/`, files.files.tempFilePath);
    foto = fileName;
  }

  const produtoCriado = await criarProdutoRepository({ restauranteId, nome, foto, preco, categoria, promocoes });

  if (produtoCriado) {
    let produtoRetorno = (await obterProdutoRepository(produtoCriado._id))[0];
    produtoRetorno.promocoes.map(promocao => {
      promocao.horario_inicio = formatDate(promocao.horario_inicio);
      promocao.horario_fim = formatDate(promocao.horario_fim);
    });
    return produtoRetorno;
  }

  return { msg: 'Ocorreu uma falha ao cadastrar o produto!' };
};

exports.listarProdutoPaginacao = async ({ restauranteId, nome, categoria, page, pageSize }) => {
  const returnDefault = {
    metadata: {
      page,
      total: 0
    },
    produtos: []
  };
  if (!restauranteId) {
    return returnDefault;
  }

  page = (page) ? page : 1;
  pageSize = (pageSize) ? pageSize : 24;
  nome = (nome) ? nome : '';
  categoria = (categoria) ? categoria : '';

  const registros = (await listarProdutosPaginacaoRepository(restauranteId, nome, categoria, page, pageSize))[0];

  if (registros) {
    registros.produtos.map(produto => {
      produto.promocoes.map(promocao => {
        promocao.horario_inicio = formatDate(promocao.horario_inicio);
        promocao.horario_fim = formatDate(promocao.horario_fim);
      });
    });
  }

  return (registros) ? registros : returnDefault;
};

exports.listarProduto = async () => await listarProdutosRepository();

exports.obterProduto = async ({ produtoId }) => {
  if (!produtoId) {
    throw { msg: 'Informações faltantes' };
  }

  let produtoRetorno = (await obterProdutoRepository(produtoId))[0];

  if (produtoRetorno) {
    produtoRetorno.promocoes.map(promocao => {
      promocao.horario_inicio = formatDate(promocao.horario_inicio);
      promocao.horario_fim = formatDate(promocao.horario_fim);
    });
  }

  return produtoRetorno;
};

exports.alterarProduto = async (body, files) => {
  if (!body || !body.produto) {
    throw { msg: 'Informações faltantes' };
  }

  let { produtoId, nome, foto, preco, categoria, promocoes } = JSON.parse(body.produto);

  if (!produtoId || !nome || !preco || !categoria) {
    throw { msg: 'Informações faltantes' };
  }

  if (promocoes) {
    for (let i = 0; i < promocoes.length; i++) {
      if (preco < promocoes[i].preco) {
        throw { msg: 'O preço normal do produto não deve ser menor que um preço promocional' };
      }
      if (!promocoes[i].horario_inicio || !promocoes[i].horario_fim ||
              !validarIntervalosDeHorario(promocoes[i].horario_inicio, promocoes[i].horario_fim, 15)) {
        throw { msg: 'O intervalo mínimo para os horários de atendimento é de 15 minutos.' };
      }
    }
  }

  if (files !== null && typeof files !== 'undefined') {
    const fileName = await salvarArquivoGridFS(files.files);
    removeUploadedFile(`${projectRoot}/`, files.files.tempFilePath);
    foto = fileName;
  }

  alterarProdutoRepository(produtoId, nome, foto, preco, categoria, promocoes);
  return true;
};

exports.deletarProduto = async ({produtoId}) => {
  if (!produtoId) {
    throw { msg: 'Informações faltantes' };
  }

  deletarProdutoRepository(produtoId);
  return true;
};