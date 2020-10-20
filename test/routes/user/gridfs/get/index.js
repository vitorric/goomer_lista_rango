const { Produto } = require('../../../../../src/schemas/produto');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/gridfs/get', () => {

    describe('Service - /POST gridfs.getImageGridFS', () => {

      let produto;
      beforeEach(async () => {
        produto = await Produto.findOne({ foto: { $exists: true } }).exec();
      });

      it('Sem Foto', (done) => {
        request(app)
          .post('/api/user/gridfs/get')
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
          .post('/api/user/gridfs/get')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send({foto: produto.foto})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('string');
            done();
          });
      });

    });

  });
};