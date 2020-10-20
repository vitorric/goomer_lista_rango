/* eslint-disable no-undef */
const { createTokenJWT } = require('../../src/services/passport/tokenJWT');

/////-------------------------- createTokenJWT --------------------------/////

module.exports = (expect, request, app) => {
  describe('File - /services/passport/tokenJWT', () => {

    describe('Function - createTokenJWT', () => {
      it('Success', (done) => {
        const user = {
          _id: '5349b4ddd2781d08c09890f3'
        };
        expect(createTokenJWT(user)).to.be.an('string');
        done();
      });
    });

  });


  /////-------------------------- Passport - userClienteAuth --------------------------/////

  describe('File - /services/passport/user/index.js', () => {

    describe('Passport - userClientAuth', () => {
      let tokenUserError = null;

      it('Wrong JWT - without "auth"', (done) => {
        request(app)
          .get('/api/user/profile/get')
          .set('content-type', 'application/json')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjUzNDliNGRkZDI3ODFkMDhjMDk4OTBmMyJ9LCJleHAiOjE2MDkzODM2MDAwMDAsImlhdCI6MTU5NTQzODI4Nn0.azx1rIzKCXdYlkZ0d7x9yjnEbnUGTIahkB9q3T2Dmgw')
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });

      it('User Not Found', (done) => {
        let token = createTokenJWT({_id: '5349b4ddd2781d08c09890f3'});
        request(app)
          .get('/api/user/profile/get')
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });

      it('Create User Test', (done) => {
        request(app)
          .post('/api/auth/create')
          .set('content-type', 'application/json')
          .send({
            name: 'Teste Login',
            password: 'e10adc3949ba59abbe56e057f20f883e',
            email: 'testelogin@gmail.com',
            info: {
              contact: '(15) 99788-4562',
              bornDate: '1994-12-22T00:00:00.000Z',
            },
            status: false
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.sucesso).to.be.true;
            tokenUserError = res.body.retorno.token;
            done();
          });
      });

      it('Wrong User Access', (done) => {
        request(app)
          .get('/api/user/profile/get')
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${tokenUserError}`)
          .send({})
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
    });

  });

  /////-------------------------- Passport - protheusAuth --------------------------/////

  describe('File - /services/passport/protheus/index.js', () => {

    describe('Passport - protheusAuth', () => {

      it('Wrong JWT - without "auth"', (done) => {
        request(app)
          .post('/api/protheus/school/create')
          .set('content-type', 'application/json')
          .set('Authorization', 'Bearer TOKEN_NULL')
          .send({})
          .expect(401)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });

    });

  });
};