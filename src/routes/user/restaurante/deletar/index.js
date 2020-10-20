const { resJsonP } = require('../../../../utils'),
  { deletarRestaurante } = require('../../../../services/api/restaurante');

/**
   * @api {delete} /api/user/restaurante/deletar Deletar Restaurante
   * @apiDescription Deleta um restaurante
   * @apiName  restaurante_deletar
   * @apiGroup Restaurante
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} restauranteId - ObjectId
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
  deletarRestaurante(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};