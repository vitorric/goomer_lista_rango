const { resJsonP } = require('../../../../utils'),
  { listarRestaurantePaginacao } = require('../../../../services/api/restaurante');

/**
   * @api {post} /api/user/restaurante/listar Listar Restaurante
   * @apiDescription Lista os restaurantes com paginação
   * @apiName  restaurante_listar
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {String} nome - Nome do Restaurante
   * @apiParam {Number} page - Pagina do filtro
   * @apiParam {Number} pageSize - Quantidade de itens do filtro
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo o erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *          "sucesso": true,
   *          "retorno": {
   *              "metadata": {
   *                  "total": 1,
   *                  "page": 1
   *              },
   *              "restaurantes": [
   *                  {
   *                      "_id": "5f8e358fbb84af458493721f",
   *                      "nome": "Goomer2",
   *                      "foto": "qfps2-2w6l8-tc7bu-28kep-egi6u.png",
   *                      "endereco": {
   *                          "rua": "R. Martinica",
   *                          "numero": "460",
   *                          "bairro": "Jardim America",
   *                          "cidade": "Sorocaba",
   *                          "estado": "SP",
   *                          "cep": "18046-805"
   *                      },
   *                      "horarios_funcionamento": [
   *                          "De Segunda à Sexta das 19:00 as 23:00",
   *                          "De Sábado à Domingo das 11:00 as 21:00"
   *                      ],
   *                      "foto": null
   *                  }
   *                  ...
   *              ]
   *          }
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
  listarRestaurantePaginacao(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};