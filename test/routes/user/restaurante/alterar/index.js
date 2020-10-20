const { Restaurante } = require('../../../../../src/schemas/restaurante');

module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/alterar.js', () => {

    describe('Service - /PUT restaurante.alterarRestaurante', () => {

      let restaurante;
      beforeEach(async () => {
        const restauranteDB = await Restaurante.findOne({}).exec();

        restaurante = {
          'restauranteId': restauranteDB._id.toString(),
          'nome': 'Goomer2',
          'endereco': {
            'rua': 'R. Martinica',
            'numero': '460',
            'bairro': 'Jardim America',
            'cidade': 'Sorocaba',
            'estado': 'SP',
            'cep': '18046-805'
          },
          'horarios_funcionamento': [{
            'dia_inicio': 'Segunda',
            'dia_fim': 'Sexta',
            'horario_inicio': '1900-01-01T19:00:00',
            'horario_fim': '1900-01-01T23:00:00'
          },{
            'dia_inicio': 'Sábado',
            'dia_fim': 'Domingo',
            'horario_inicio': '1900-01-01T11:00:00',
            'horario_fim': '1900-01-01T21:00:00'
          }]
        };
      });

      it('Sem o Body', (done) => {
        request(app)
          .put('/api/user/restaurante/alterar')
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

      it('Sem o Restaurante', (done) => {
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('x', JSON.stringify(restaurante))
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
        delete restaurante.nome;
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem RestaurenteId', (done) => {
        delete restaurante.restauranteId;
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Horários de Funcionamento', (done) => {
        restaurante.nome = 'Goomer 2';
        delete restaurante.horarios_funcionamento;
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.true;
            done();
          });
      });

      it('Horários de Funcionamento sem horário inicio', (done) => {
        delete restaurante.horarios_funcionamento[0].horario_inicio;
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Horários de Funcionamento sem horário fim', (done) => {
        delete restaurante.horarios_funcionamento[0].horario_fim;
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Horários de Funcionamento com menos de 15min intervalo', (done) => {
        restaurante.horarios_funcionamento[0].horario_fim = '1900-01-01T19:12:00';
        request(app)
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
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
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
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
          .put('/api/user/restaurante/alterar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .attach('files', './test/imagens_teste_upload/logo_goomer.png')
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