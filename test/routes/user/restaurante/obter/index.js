const { Restaurante } = require('../../../../../src/schemas/restaurante');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/obter.js', () => {

    describe('Service - /POST restaurante.obterRestaurante', () => {

      let restauranteId;
      beforeEach(async () => {
        const restaurante = await Restaurante.findOne({}).exec();
        restauranteId = restaurante._id.toString();
      });

      it('Sem RestauranteId', (done) => {
        request(app)
          .post('/api/user/restaurante/obter')
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
          .post('/api/user/restaurante/obter')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({restauranteId: '5f8efcb923f2e0658921e591'})
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
          .post('/api/user/restaurante/obter')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({restauranteId})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).an('object')
              .that.has.contains.keys('_id', 'nome', 'endereco', 'horarios_funcionamento');
            done();
          });
      });

    });

  });
};