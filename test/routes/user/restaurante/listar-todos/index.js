module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/listar.js', () => {

    describe('Service - /GET restaurante.listarRestaurante', () => {

      it('Sucesso', (done) => {
        request(app)
          .get('/api/user/restaurante/listar')
          .set('Authorization', global.tokenUser)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('array');
            done();
          });
      });

    });

  });
};