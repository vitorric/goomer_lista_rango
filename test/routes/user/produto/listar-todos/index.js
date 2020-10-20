module.exports = async (expect, request, app) => {
  describe('File /routes/user/produto/listar', () => {

    describe('Service - /GET produto.listarProduto', () => {

      it('Sucesso', (done) => {
        request(app)
          .get('/api/user/produto/listar')
          .set('Authorization', global.tokenUser)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('array');
            expect(res.body.retorno).lengthOf(3);
            done();
          });
      });

    });

  });
};