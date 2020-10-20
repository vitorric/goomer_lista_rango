module.exports = async (expect, request, app) => {
  describe('File /routes/auth/login.js', () => {

    describe('Service - /POST user.loginUser', () => {

      let user = {};
      beforeEach(() => {
        user = {
          password: '123456',
          email: 'vitorricardo@outlook.com'
        };
      });

      it('Unauthorized', (done) => {
        user.email = 'teste@email.com';
        request(app)
          .post('/api/auth/login')
          .set('content-type', 'application/json')
          .send(user)
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });


      it('Password Errado', (done) => {
        user.password = '123';
        request(app)
          .post('/api/auth/login')
          .set('content-type', 'application/json')
          .send(user)
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });

      it('Sucesso', (done) => {
        request(app)
          .post('/api/auth/login')
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

            global.tokenUser = `Bearer ${res.body.retorno.token}`;
            done();
          });
      });

    });

  });
};