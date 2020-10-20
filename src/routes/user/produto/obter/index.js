const { resJsonP } = require('../../../../utils'),
  { obterProduto } = require('../../../../services/api/produto');

/**
   * @api {post} /api/user/produto/obter Obter Produto
   * @apiDescription Obtém um produto
   * @apiName  produto_obter
   * @apiGroup Produto
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "application/json",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} produtoId - ObjectId do Produto
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo uma mensagem de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *        "sucesso": true,
   *        "retorno": {
   *            "_id": "5f8e3f27708c3947d8a7088d",
   *            "nome": "produto 3",
   *            "foto": "1tmk5-q6a7s-zfmux-r2lrm-ptqqa.jpg",
   *            "preco": 14,
   *            "categoria": "Bebidas",
   *            "promocoes": [
   *                {
   *                    "_id": "5f8e40aceae7c91d20ca0b13",
   *                    "descricao": "Aquela brejinha por 10 conto",
   *                    "preco": 10,
   *                    "dia": "Quinta",
   *                    "horario_inicio": "19:00",
   *                    "horario_fim": "23:00"
   *                },
   *                {
   *                    "_id": "5f8e40aceae7c91d20ca0b14",
   *                    "descricao": "De domingo pague 12",
   *                    "preco": 12,
   *                    "dia": "Domingo",
   *                    "horario_inicio": "11:00",
   *                    "horario_fim": "21:00"
   *                }
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
  obterProduto(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};