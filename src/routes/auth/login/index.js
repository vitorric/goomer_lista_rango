const { resJsonP } = require('../../../utils'),
  { loginUser } = require('../../../services/api/user');


/**
 * @api {post} /api/auth/login Login Usuário
 * @apiDescription Efetua a autenticação do usuário
 * @apiName  auth_login
 * @apiGroup Autentitacao
 * @apiVersion 1.0.0
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       content-type: 'application/json'
 *     }
 * @apiParam {String} password Senha
 * @apiParam {String} email Email
 * @apiSuccess {String} sucesso <code>Boolean</code>
 * @apiSuccess {Object} retorno objeto contendo os dados do usuário
 * @apiError {String} sucesso <code>false</code>
 * @apiError {String} retorno objeto contendo a msg de erro
   * @apiSuccessExample {json} Success-Response:
   *      HTTP/1.1 200 OK
   *      {
   *        "sucesso": true,
  *         "retorno": {
  *             "user": {
  *                 "nome": "Vitor Ricardo",
  *                 "email": "vitorricardo@outlook.com"
  *             },
  *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7Il9pZCI6IjVmOGU0NjU5M2U4NWQwNDAyOGM4NWJlOCJ9LCJleHAiOjE2MDMxNjAyNDE0ODUsImlhdCI6MTYwMzE1OTY0MX0.EVRnv56DZeNl3_QckIRv7DD98e6T5nAHrLZlEKV98ng"
  *         }
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
  loginUser(req.user)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};