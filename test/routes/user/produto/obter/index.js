
const { Produto } = require('../../../../../src/schemas/produto');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/produto/obter', () => {

    describe('Service - /POST produto.obterproduto', () => {

      let produtoId;
      beforeEach(async () => {
        const produto = await Produto.findOne({}).exec();
        produtoId = produto._id.toString();
      });

      it('Sem ProdutoId', (done) => {
        request(app)
          .post('/api/user/produto/obter')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });


      it('Não encontrou', (done) => {
        request(app)
          .post('/api/user/produto/obter')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({produtoId: '5f8efcb923f2e0658921e591'})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            done();
          });
      });

      it('Sucesso', (done) => {
        request(app)
          .post('/api/user/produto/obter')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({produtoId})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).an('object')
              .that.has.contains.keys('_id', 'nome', 'preco', 'categoria', 'promocoes');
            done();
          });
      });

    });

  });
};