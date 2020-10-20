const { Produto } = require('../../../../../src/schemas/produto');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/produto/deletar', () => {

    describe('Service - /DELETE produto.deletarproduto', () => {

      let produto;
      beforeEach(async () => {
        produto = await Produto.findOne({}).exec();
      });

      it('Sem produtoId', (done) => {
        request(app)
          .delete('/api/user/produto/deletar')
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


      it('Sucesso', (done) => {
        request(app)
          .delete('/api/user/produto/deletar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({produtoId: produto._id.toString()})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.true;
            done();
          });
      });

    });

  });
};