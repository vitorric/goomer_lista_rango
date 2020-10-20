const { resJsonP } = require('../../../../utils'),
  { criarRestaurante } = require('../../../../services/api/restaurante');

/**
   * @api {post} /api/user/restaurante/criar Cadastrar Restaurante
   * @apiDescription Cadastra um restaurante
   * @apiName  restaurante_criar
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "form-data",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {Object} restaurante - Objeto do Restaurante
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
   *           "retorno": {
   *               "_id": "5f8e358fbb84af458493721f",
   *               "nome": "Goomer",
   *               "foto": "qfps2-2w6l8-tc7bu-28kep-egi6u.png",
   *               "endereco": {
   *                   "rua": "R. Martinica",
   *                   "numero": "460",
   *                   "bairro": "Jardim America",
   *                   "cidade": "Sorocaba",
   *                   "estado": "SP",
   *                   "cep": "18046-805"
   *               },
   *               "horarios_funcionamento": [
   *                   {
   *                       "_id": "5f8e358fbb84af4584937220",
   *                       "dia_inicio": "Segunda",
   *                       "dia_fim": "Sexta",
   *                       "horario_inicio": "1900-01-01T22:06:28.000Z",
   *                       "horario_fim": "1900-01-02T02:06:28.000Z"
   *                   },
   *                   {
   *                       "_id": "5f8e358fbb84af4584937221",
   *                       "dia_inicio": "Sábado",
   *                       "dia_fim": "Domingo",
   *                       "horario_inicio": "1900-01-01T14:06:28.000Z",
   *                       "horario_fim": "1900-01-02T00:06:28.000Z"
   *                   }
   *               ],
   *               "createdAt": "2020-10-20T00:55:43.385Z",
   *               "updatedAt": "2020-10-20T00:55:43.385Z",
   *               "__v": 0
   *           }
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
  criarRestaurante(req.body, req.files)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};