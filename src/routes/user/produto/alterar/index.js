const { resJsonP } = require('../../../../utils'),
  { alterarProduto } = require('../../../../services/api/produto');

/**
   * @api {put} /api/user/produto/alterar Alterar Produto
   * @apiDescription Altera um Produto
   * @apiName  produto_alterar
   * @apiGroup Produto
   * @apiVersion 1.0.0
   * @apiHeaderExample {json} Header-Example:
   *     {
   *        content-type: "form-data",
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiParam {ObjectId} produtoId - ObjectId do Produto
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
  alterarProduto(req.body, req.files)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};