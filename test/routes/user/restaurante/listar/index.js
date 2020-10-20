module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/listar', () => {

    describe('Service - /POST restaurante.listarRestaurantePaginacao', () => {

      let filtros;
      beforeEach(async () => {
        filtros = {
          page: 1,
          pageSize: 24,
          nome: ''
        };
      });

      it('Sem Page', (done) => {
        delete filtros.page;
        request(app)
          .post('/api/user/restaurante/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'restaurantes');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.restaurantes).to.be.an('array');
            done();
          });
      });

      it('Sem PageSize', (done) => {
        delete filtros.pageSize;
        request(app)
          .post('/api/user/restaurante/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'restaurantes');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.restaurantes).to.be.an('array');
            done();
          });
      });


      it('Sem nome', (done) => {
        delete filtros.nome;
        request(app)
          .post('/api/user/restaurante/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'restaurantes');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.restaurantes).to.be.an('array');
            done();
          });
      });

      it('Sucesso', (done) => {
        filtros.nome = 'Goom';
        request(app)
          .post('/api/user/restaurante/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'restaurantes');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.restaurantes).to.be.an('array');
            done();
          });
      });
    });

  });
};