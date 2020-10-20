const { resJsonP } = require('../../../../utils'),
  { listarRestaurante } = require('../../../../services/api/restaurante');

/**
   * @api {get} /api/user/restaurante/listar Listar Restaurante
   * @apiDescription Lista os restaurantes sem filtro nenhum e sem tratamento
   * @apiName  restaurante_listar_todos
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo o erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *          "sucesso": true,
   *          "retorno": [
   *              {
   *                  "endereco": {
   *                      "rua": "R. Martinica",
   *                      "numero": "460",
   *                      "bairro": "Jardim America",
   *                      "cidade": "Sorocaba",
   *                      "estado": "SP",
   *                      "cep": "18046-805"
   *                  },
   *                  "_id": "5f8e358fbb84af458493721f",
   *                  "nome": "Goomer2",
   *                  "foto": "qfps2-2w6l8-tc7bu-28kep-egi6u.png",
   *                  "horarios_funcionamento": [
   *                      {
   *                          "_id": "5f8e36294067e91e80ecd960",
   *                          "dia_inicio": "Segunda",
   *                          "dia_fim": "Sexta",
   *                          "horario_inicio": "1900-01-01T22:06:28.000Z",
   *                          "horario_fim": "1900-01-02T02:06:28.000Z"
   *                      },
   *                      {
   *                          "_id": "5f8e36294067e91e80ecd961",
   *                          "dia_inicio": "Sábado",
   *                          "dia_fim": "Domingo",
   *                          "horario_inicio": "1900-01-01T14:06:28.000Z",
   *                          "horario_fim": "1900-01-02T00:06:28.000Z"
   *                      }
   *                  ],
   *                  "createdAt": "2020-10-20T00:55:43.385Z",
   *                  "updatedAt": "2020-10-20T00:58:17.689Z",
   *                  "__v": 0
   *              }
   *              ...
   *          ]
   *      }
   * @apiErrorExample {json} Requisição inválida:
   *     HTTP/1.1 401 OK
   *     {
   *        "sucesso": false,
   *        "retorno": {
   *          "ok": 0,
   *          "code": 15957,
   *          "codeName": "Location15957",
   *          "name": "MongoError"
   *        }
   *     }
   * @apiErrorExample {json} Unauthorized:
   *     HTTP/1.1 401 OK
   *     {
   *       Unauthorized
   *     }
**/
module.exports = () => (req, res) => {
  listarRestaurante()
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};