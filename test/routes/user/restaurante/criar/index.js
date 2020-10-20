module.exports = async (expect, request, app) => {
  describe('File /routes/user/restaurante/criar.js', () => {

    describe('Service - /POST restaurante.criarRestaurante', () => {

      let restaurante = {};
      beforeEach(() => {
        restaurante = {
          'nome': 'Goomer',
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
          .post('/api/user/restaurante/criar')
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
          .post('/api/user/restaurante/criar')
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
          .post('/api/user/restaurante/criar')
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
        delete restaurante.horarios_funcionamento;
        request(app)
          .post('/api/user/restaurante/criar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.contains.keys('_id', 'nome', 'endereco', 'horarios_funcionamento');
            done();
          });
      });

      it('Horários de Funcionamento sem horário inicio', (done) => {
        delete restaurante.horarios_funcionamento[0].horario_inicio;
        request(app)
          .post('/api/user/restaurante/criar')
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
          .post('/api/user/restaurante/criar')
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
          .post('/api/user/restaurante/criar')
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
          .post('/api/user/restaurante/criar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.contains.keys('_id', 'nome', 'endereco', 'horarios_funcionamento');
            done();
          });
      });

      it('Com foto', (done) => {
        request(app)
          .post('/api/user/restaurante/criar')
          .set('content-type', 'multipart/form-data')
          .set('Authorization', global.tokenUser)
          .field('restaurante', JSON.stringify(restaurante))
          .attach('files', './test/imagens_teste_upload/logo_goomer.png')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object')
              .that.has.contains.keys('_id', 'nome', 'endereco', 'horarios_funcionamento', 'foto');
            done();
          });
      });

    });

  });
};