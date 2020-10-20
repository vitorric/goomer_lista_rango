const mongoose = require('mongoose'),
  path = require('path'),
  crypto = require('crypto'),
  util = require('util'),
  exec = util.promisify(require('child_process').exec);

const projectRoot = path.dirname(process.argv[1]);
exports.projectRoot = projectRoot;

exports.ObjectIdCast = mongoose.Types.ObjectId;

exports.getMD5 = (password) => crypto.createHash('md5').update(password, 'utf8').digest('hex');

exports.resJsonP = (res, code, sucesso, retorno) => res.status(code).jsonp({ sucesso, retorno });

exports.randomString = length => {
  const possible = 'abcdefghijklmnpqrstuvwxyz123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const execute = async function shell(comand) {
  // eslint-disable-next-line no-unused-vars
  const { stdout, stderr } = await exec(comand);
  return stdout;

};
exports.execute = execute;

exports.removeUploadedFile = (path, name = '') => {
  if (path && path.length > 0) {
    execute(`rm -f ${path}${name}`);
  }
};

exports.formatDate = date => {

  date = new Date(date);

  let hours = (date.getHours() > 10) ? date.getHours() : `0${date.getHours()}`;
  let minutes = (date.getMinutes() > 10) ? date.getMinutes() : `0${date.getMinutes()}`;

  return `${hours}:${minutes}`;
};

exports.validarIntervalosDeHorario = (dataInicio, dataFim, minutos) => {
  const intervalo = Math.floor((Math.abs(new Date(dataFim) - new Date(dataInicio))/1000)/60);

  return intervalo >= minutos;
};