const { resJsonP } = require('../../../../utils'),
  { alterarRestaurante } = require('../../../../services/api/restaurante');

/**
   * @api {put} /api/user/restaurante/alterar Alterar Restaurante
   * @apiDescription Altera um restaurante
   * @apiName  restaurante_alterar
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "form-data",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {Object} restaurante - Objeto do Restaurante
   * @apiParam {ObjectId} restaurante.restauranteId - ObjectId
   * @apiParam {String} restaurante.nome - Nome
   * @apiParam {Object} restaurante.endereco - Objeto do Endereco
   * @apiParam {Object} restaurante.endereco.rua - Rua
   * @apiParam {String} restaurante.endereco.numero - Número
   * @apiParam {String} restaurante.endereco.bairro - Bairro
   * @apiParam {String} restaurante.endereco.cidade - Cidade
   * @apiParam {String} restaurante.endereco.estado - Estado
   * @apiParam {String} restaurante.endereco.cep - CEP
   * @apiParam {Array}  restaurante.horarios_funcionamento - Horários de funcionamento
   * @apiParam {String} restaurante.horarios_funcionamento.dia_inicio - Dia de abertura
   * @apiParam {String} restaurante.horarios_funcionamento.dia_fim - Dia de fechamento
   * @apiParam {String} restaurante.horarios_funcionamento.horario_inicio - Horário de abertura
   * @apiParam {String} restaurante.horarios_funcionamento.horario_fim - Horário de fechamento
   * @apiParam {File} files - Arquivo de foto do restaurante
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo uma mensagem de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *           "sucesso": true,
   *           "retorno": true
   *      }
   * @apiErrorExample {json} Requisição inválida:
   *     HTTP/1.1 401 OK
   *     {
   *        "sucesso": false,
   *        "retorno": {
   *            "msg": "Informações faltantes"
   *        }
   *     }
   * @apiErrorExample {json} Unauthorized:
   *     HTTP/1.1 401 OK
   *     {
   *       Unauthorized
   *     }
**/
module.exports = () => (req, res) => {
  alterarRestaurante(req.body, req.files)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};