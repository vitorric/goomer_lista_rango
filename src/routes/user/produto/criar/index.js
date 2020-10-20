const { resJsonP } = require('../../../../utils'),
  { criarProduto } = require('../../../../services/api/produto');

/**
   * @api {post} /api/user/produto/criar Cadastrar Produto
   * @apiDescription Cadastra um Produto
   * @apiName  produto_criar
   * @apiGroup Produto
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "form-data",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} restauranteId - ObjectId do Restaurante
   * @apiParam {String} nome - Nome
   * @apiParam {String} categoria - Categoria
   * @apiParam {Number} preco - Preço
   * @apiParam {Array}  promocoes - Promoções do Produto
   * @apiParam {String} promocoes.dia - Dia da semana
   * @apiParam {String} promocoes.descricao - Descrição
   * @apiParam {Number} promocoes.preco - Preço promocional
   * @apiParam {String} promocoes.horario_inicio - Horário de abertura
   * @apiParam {String} promocoes.horario_fim - Horário de fechamento
   * @apiParam {File} files - Arquivo de foto do produto
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo a resposta da requisição
   * @apiError {String} sucesso <code>false</code>
   * @apiError {Object} retorno objeto contendo uma mensagem de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *           "sucesso": true,
   *           "retorno": {
   *               "_id": "5f8e3f27708c3947d8a7088d",
   *               "nome": "produto 3",
   *               "foto": "fkrdc-uxxdu-2cj1w-jj471-44j2w.jpg",
   *               "preco": 14,
   *               "categoria": "Bebidas",
   *               "promocoes": [
   *                   {
   *                       "_id": "5f8e3f27708c3947d8a7088e",
   *                       "descricao": "Aquela brejinha por 10 conto",
   *                       "preco": 10,
   *                       "dia": "Quinta",
   *                       "horario_inicio": "19:00",
   *                       "horario_fim": "23:00"
   *                   },
   *                   {
   *                       "_id": "5f8e3f27708c3947d8a7088f",
   *                       "descricao": "De domingo pague 12",
   *                       "preco": 12,
   *                       "dia": "Domingo",
   *                       "horario_inicio": "11:00",
   *                       "horario_fim": "21:00"
   *                   }
   *               ]
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
  criarProduto(req.body, req.files)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};