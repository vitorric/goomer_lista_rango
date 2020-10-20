const { Restaurante } = require('../../../../../src/schemas/restaurante');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/produto/listar', () => {

    describe('Service - /POST produto.listarProdutoPaginacao', () => {

      let filtros;
      beforeEach(async () => {
        const restauranteDB = await Restaurante.findOne({}).exec();
        filtros = {
          page: 1,
          pageSize: 24,
          nome: '',
          categoria: '',
          restauranteId: restauranteDB._id.toString()
        };
      });

      it('Sem RestauranteId', (done) => {
        delete filtros.restauranteId;
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(0);
            done();
          });
      });

      it('Sem Page', (done) => {
        delete filtros.page;
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });

      it('Sem PageSize', (done) => {
        delete filtros.pageSize;
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });


      it('Sem nome', (done) => {
        delete filtros.nome;
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });

      it('Sem categoria', (done) => {
        delete filtros.nome;
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });

      it('Produto que nao existe nome', (done) => {
        filtros.nome = 'Goom';
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(0);
            done();
          });
      });

      it('Filtro nome', (done) => {
        filtros.nome = 'p';
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });

      it('Filtro categoria', (done) => {
        filtros.categoria = 'Bebidas';
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });

      it('Filtro categoria e nome', (done) => {
        filtros.nome = 'p';
        filtros.categoria = 'Bebidas';
        request(app)
          .post('/api/user/produto/listar')
          .set('content-type', 'application/json')
          .set('Authorization', global.tokenUser)
          .send(filtros)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('metadata', 'produtos');
            expect(res.body.retorno.metadata).to.be.an('object')
              .that.has.all.keys('total', 'page');
            expect(res.body.retorno.produtos).to.be.an('array');
            expect(res.body.retorno.produtos).lengthOf(3);
            done();
          });
      });
    });

  });
};