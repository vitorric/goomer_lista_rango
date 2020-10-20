module.exports = async (expect, request, app) => {

  describe('File /routes/auth/create.js', () => {

    describe('Service - /POST user.createUser', () => {

      let user = {};
      beforeEach(() => {
        user = {
          nome: 'Vitor Ricardo',
          password: '123456',
          email: 'vitorricardo@outlook.com'
        };
      });

      it('Sem Nome', (done) => {
        delete user.nome;
        request(app)
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send(user)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Email', (done) => {
        delete user.email;
        request(app)
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send(user)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });

      it('Sem Password', (done) => {
        delete user.password;
        request(app)
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send(user)
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
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send(user)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            expect(res.body.retorno).to.be.an('object');
            expect(res.body.retorno.token).to.be.an('string');
            expect(res.body.retorno.user).to.be.an('object')
              .that.has.all.keys('nome', 'email');
            done();
          });
      });

      it('Usuário Existente', (done) => {
        request(app)
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send(user)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.false;
            expect(res.body.retorno).to.be.an('object')
              .that.has.all.keys('msg');
            done();
          });
      });
    });
  });
};