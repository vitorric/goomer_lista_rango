const { resJsonP } = require('../../../../utils'),
  { getImageGridFS } = require('../../../../services/api/gridfs');

/**
 * @api {post} /api/user/grifs/get Obter Imagem
 * @apiDescription Obtém uma imagem
 * @apiName  gridfs_get
 * @apiGroup GridFS
 * @apiVersion 1.0.0
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       content-type: 'application/json',
 *        Authorization : "Bearer token"
 *     }
 *
 * @apiParam {String} foto - Nome da imagem
 * @apiSuccess {String} sucesso <code>Boolean</code>
 * @apiSuccess {Object} retorno objeto contendo o buffer da imagem
 * @apiError {String} sucesso <code>false</code>
 * @apiError {String} retorno objeto contendo a msg de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *        "sucesso": true,
   *        "retorno": "ffd8ffe000104a46494600010100000100010000ffdb0043000302..."
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
  getImageGridFS(req.body)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};