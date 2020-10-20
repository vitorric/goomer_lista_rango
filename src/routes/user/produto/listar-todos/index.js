const { resJsonP } = require('../../../../utils'),
  { listarProduto } = require('../../../../services/api/produto');

/**
   * @api {get} /api/user/produto/listar Listar Produto
   * @apiDescription Lista os produtos sem filtro nenhum e sem tratamento
   * @apiName  produto_listar_todos
   * @apiGroup Produto
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
   *                  "_id": "5f8e3ae816426853c4cb632f",
   *                  "restauranteId": "5f8e38b9d0065144b0bf5140",
   *                  "nome": "produto 3",
   *                  "foto": "6ql1t-eeqnc-sue11-qtizb-yfhme.jpg",
   *                  "preco": 14,
   *                  "categoria": "Bebidas",
   *                  "promocoes": [
   *                      {
   *                          "_id": "5f8e3ae816426853c4cb6330",
   *                          "descricao": "Aquela brejinha por 10 conto",
   *                          "preco": 10,
   *                          "dia": "Quinta",
   *                          "horario_inicio": "1900-01-01T22:06:28.000Z",
   *                          "horario_fim": "1900-01-02T02:06:28.000Z"
   *                      },
   *                      {
   *                          "_id": "5f8e3ae816426853c4cb6331",
   *                          "descricao": "De domingo pague 12",
   *                          "preco": 12,
   *                          "dia": "Domingo",
   *                          "horario_inicio": "1900-01-01T14:06:28.000Z",
   *                          "horario_fim": "1900-01-02T00:06:28.000Z"
   *                      }
   *                  ],
   *                  "createdAt": "2020-10-20T01:18:32.191Z",
   *                  "updatedAt": "2020-10-20T01:18:32.191Z",
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
  listarProduto()
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};