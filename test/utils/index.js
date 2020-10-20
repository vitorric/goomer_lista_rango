/* eslint-disable no-undef */
const { getMD5 } = require('../../src/utils');

module.exports = (expect) => {
  describe('File - /utils.js', () => {

    describe('Function - getMD5', () => {
      it('Success', (done) => {
        expect(getMD5('123456')).to.equal('e10adc3949ba59abbe56e057f20f883e');
        done();
      });
    });
  });

};