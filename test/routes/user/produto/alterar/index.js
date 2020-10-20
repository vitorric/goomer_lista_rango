const { Produto } = require('../../../../../src/schemas/produto');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/produto/alterar', () => {

    describe('Service - /PUT produto.alterarProduto', () => {
      let produto = {};
      beforeEach(async () => {
        const produtoDB = await Produto.findOne({}).exec();
        produto = {
          'nome': 'produto 3',
          'categoria': 'Bebidas',
          'preco': '14.00',
          'promocoes': [{
            'descricao': 'Aquela brejinha por 10 conto',
            'preco': '10.00',
            'dia': 'Quinta',
            'horario_inicio': '1900-01-01T19:00:00',
            'horario_fim': '1900-01-01T23:00:00'
          }, {
            'descricao': 'De domingo pague 12',
            'preco': '12.00',
            'dia': 'Domingo',
            'horario_inicio': '1900-01-01T11:00:00',
            'horario_fim': '1900-01-01T21:00:00'
          }]
        };
        produto.produtoId = produtoDB._id.toString();
      });

      it('Sem o Body', (done) => {
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem o Produto', (done) => {
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('x', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem ProdutoId', (done) => {
        delete produto.produtoId;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Nome', (done) => {
        delete produto.nome;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Preço', (done) => {
        delete produto.preco;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Categoria', (done) => {
        delete produto.categoria;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Promoções', (done) => {
        delete produto.promocoes;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.true;
            done();
          });
      });

      it('Preço normal menor que a promoção', (done) => {
        produto.promocoes[0].preco = 20;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Promoção sem horário inicio', (done) => {
        delete produto.promocoes[0].horario_inicio;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Promoção sem horário fim', (done) => {
        delete produto.promocoes[0].horario_fim;
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Horários da promoção com menos de 15min intervalo', (done) => {
        produto.promocoes[0].horario_fim = '1900-01-01T19:12:00';
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem foto', (done) => {
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.true;
            done();
          });
      });

      it('Com foto', (done) => {
        request(app)
          .put('/api/user/produto/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('produto', JSON.stringify(produto))
          .attach('files', './test/imagens_teste_upload/produto1.jpg')
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