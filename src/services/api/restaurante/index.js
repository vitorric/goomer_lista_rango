const { criarRestauranteRepository, listarRestaurantesRepository, listarRestaurantesPaginacaoRepository,
    obterRestauranteRepository, alterarRestauranteRepository, deletarRestauranteRepository } = require('../../../repositories/restaurante'),
  { salvarArquivoGridFS } = require('../../../repositories/gridFS'),
  { formatDate, projectRoot, removeUploadedFile, validarIntervalosDeHorario } = require('../../../utils');

exports.criarRestaurante = async (body, files) => {
  if (!body || !body.restaurante) {
    throw { msg: 'Informações faltantes' };
  }

  let { nome, foto, endereco, horarios_funcionamento } = JSON.parse(body.restaurante);

  if (!nome) {
    throw { msg: 'Informações faltantes' };
  }

  if (horarios_funcionamento) {
    for (let i = 0; i < horarios_funcionamento.length; i++) {
      if (!horarios_funcionamento[i].horario_inicio || !horarios_funcionamento[i].horario_fim ||
      !validarIntervalosDeHorario(horarios_funcionamento[i].horario_inicio, horarios_funcionamento[i].horario_fim, 15)) {
        throw { msg: 'O intervalo mínimo para os horários de atendimento é de 15 minutos.' };
      }
    }
  }

  if (files !== null && typeof files !== 'undefined') {
    const fileName = await salvarArquivoGridFS(files.files);
    removeUploadedFile(`${projectRoot}/`, files.files.tempFilePath);
    foto = fileName;
  }

  const restauranteCriado = await criarRestauranteRepository({ nome, foto, endereco, horarios_funcionamento });

  if (restauranteCriado) {
    return restauranteCriado;
  }

  return { msg: 'Ocorreu uma falha ao cadastrar o restaurante!' };
};

exports.listarRestaurante = async () => await listarRestaurantesRepository();

exports.listarRestaurantePaginacao = async ({ nome, page, pageSize }) => {
  page = (page) ? page : 1;
  pageSize = (pageSize) ? pageSize : 1;
  nome = (nome) ? nome : '';

  let registros = (await listarRestaurantesPaginacaoRepository(nome, page, pageSize))[0];

  registros.restaurantes.map(restaurante => {
    restaurante.horarios_funcionamento = (restaurante.horarios_funcionamento) ? restaurante.horarios_funcionamento.map(horario => {
      return `De ${horario.dia_inicio} à ${(horario.dia_fim) ? horario.dia_fim : ''} das ${formatDate(horario.horario_inicio)} as ${formatDate(horario.horario_fim)}`;
    }) : [];
  });

  return registros;
};

exports.obterRestaurante = async ({ restauranteId }) => {
  if (!restauranteId) {
    throw { msg: 'Informações faltantes' };
  }

  let restaurante = await obterRestauranteRepository(restauranteId);

  if (!restaurante) {
    throw { msg: 'Restaurante não encontrado' };
  }

  const horarios = (restaurante.horarios_funcionamento) ? restaurante.horarios_funcionamento.map(horario => {
    return `De ${horario.dia_inicio} à ${(horario.dia_fim) ? horario.dia_fim : ''} das ${formatDate(horario.horario_inicio)} as ${formatDate(horario.horario_fim)}`;
  }) : [];

  return {
    _id: restaurante._id,
    nome: restaurante.nome,
    endereco: restaurante.endereco,
    foto: restaurante.foto,
    horarios_funcionamento: horarios
  };
};

exports.alterarRestaurante = async (body, files) => {
  if (!body || !body.restaurante) {
    throw { msg: 'Informações faltantes' };
  }

  let { restauranteId, nome, foto, endereco, horarios_funcionamento } = JSON.parse(body.restaurante);

  if (!nome || !restauranteId) {
    throw { msg: 'Informações faltantes' };
  }

  let horarioIncorreto = false;

  if (horarios_funcionamento) {
    for (let i = 0; i < horarios_funcionamento.length; i++) {
      if (!horarios_funcionamento[i].horario_inicio || !horarios_funcionamento[i].horario_fim ||
        !validarIntervalosDeHorario(horarios_funcionamento[i].horario_inicio, horarios_funcionamento[i].horario_fim, 15)) {
        horarioIncorreto = true;
        break;
      }
    }
  }

  if (!horarios_funcionamento) {
    horarios_funcionamento = [];
  }

  if (horarioIncorreto) {
    throw { msg: 'O intervalo mínimo para os horários de atendimento é de 15 minutos.' };
  }

  if (files !== null && typeof files !== 'undefined') {
    const fileName = await salvarArquivoGridFS(files.files);
    removeUploadedFile(`${projectRoot}/`, files.files.tempFilePath);
    foto = fileName;
  }

  alterarRestauranteRepository(restauranteId, nome, foto, endereco, horarios_funcionamento);
  return true;
};

exports.deletarRestaurante = async ({restauranteId}) => {
  if (!restauranteId) {
    throw { msg: 'Informações faltantes' };
  }
  deletarRestauranteRepository(restauranteId);
  return true;
};