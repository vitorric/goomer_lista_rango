const { resJsonP } = require('../../../../utils'),
  { obterRestaurante } = require('../../../../services/api/restaurante');

/**
   * @api {post} /api/user/restaurante/obter Obter Restaurante
   * @apiDescription Obtém um restaurante
   * @apiName  restaurante_obter
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} restauranteId - ObjectId do Restaurante
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo uma mensagem de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *        "sucesso": true,
   *        "retorno": {
   *            "nome": "Goomer",
   *            "endereco": {
   *                "rua": "R. Martinica",
   *                "numero": "460",
   *                "bairro": "Jardim America",
   *                "cidade": "Sorocaba",
   *                "estado": "SP",
   *                "cep": "18046-805"
   *            },
   *            "foto": "qfps2-2w6l8-tc7bu-28kep-egi6u.png",
   *            "horarios_funcionamento": [
   *                "De Segunda à Sexta das 19:00 as 23:00",
   *                "De Sábado à Domingo das 11:00 as 21:00"
   *            ]
   *        }
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
  obterRestaurante(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};