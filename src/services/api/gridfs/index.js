const { baixarArquivoGridFS } = require('../../../repositories/gridFS');

exports.getImageGridFS = async ({foto}) => {
  if (!foto) {
    throw { msg: 'Informações faltantes' };
  }
  return await baixarArquivoGridFS(foto);
};