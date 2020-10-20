const { resJsonP } = require('../../../../utils'),
  { listarProdutoPaginacao } = require('../../../../services/api/produto');

/**
   * @api {post} /api/user/produto/listar Listar Produto
   * @apiDescription Lista os produtos com paginação
   * @apiName  produto_listar
   * @apiGroup Produto
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} restauranteId - ObjectId do Restaurante
   * @apiParam {String} nome - Nome do Produto
   * @apiParam {String} categoria - Categoria do Produto
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
   *              "produtos": [
   *                  {
   *                      "_id": "5f8e3ae816426853c4cb632f",
   *                      "nome": "produto 3",
   *                      "foto": "6ql1t-eeqnc-sue11-qtizb-yfhme.jpg",
   *                      "preco": 14,
   *                      "categoria": "Bebidas",
   *                      "promocoes": [
   *                          {
   *                              "_id": "5f8e3ae816426853c4cb6330",
   *                              "descricao": "Aquela brejinha por 10 conto",
   *                              "preco": 10,
   *                              "dia": "Quinta",
   *                              "horario_inicio": "19:00",
   *                              "horario_fim": "23:00"
   *                          },
   *                          {
   *                              "_id": "5f8e3ae816426853c4cb6331",
   *                              "descricao": "De domingo pague 12",
   *                              "preco": 12,
   *                              "dia": "Domingo",
   *                              "horario_inicio": "11:00",
   *                              "horario_fim": "21:00"
   *                          }
   *                      ]
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
  listarProdutoPaginacao(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};