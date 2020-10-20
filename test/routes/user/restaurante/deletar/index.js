const { Restaurante } = require('../../../../../src/schemas/restaurante');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/deletar.js', () => {

    describe('Service - /DELETE restaurante.deletarRestaurante', () => {

      let restaurante;
      beforeEach(async () => {
        restaurante = await Restaurante.findOne({}).exec();
      });

      it('Sem RestauranteId', (done) => {
        request(app)
          .delete('/api/user/restaurante/deletar')
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
          .delete('/api/user/restaurante/deletar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({restauranteId: restaurante._id.toString()})
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