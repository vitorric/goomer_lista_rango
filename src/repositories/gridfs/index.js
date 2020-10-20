const fs = require('fs'),
  mongoose = require('mongoose'),
  { mongoGridFSDB } = require('../../conn/index'),
  { randomString } = require('../../utils');

exports.salvarArquivoGridFS = async file => {

  let gfs = new mongoose.mongo.GridFSBucket(mongoGridFSDB.db, {
    chunkSizeBytes: 1024,
    bucketName: 'fs'
  });
  if (!file) {
    throw 'Não há arquivo para salvar!';
  }

  const newFileName = `${randomString(5)}-${randomString(5)}-${randomString(5)}-${randomString(5)}-${randomString(5)}`;
  file.name = newFileName + file.name.match(/\.[0-9a-z]+$/i);
  let filename = file.name.match(/[\w-]+\.(jpg|jpeg|png|mp4|mov|avi|MOV|ogg|wav)/g).toString();

  let a = fs.createReadStream(file.tempFilePath)
    .pipe(gfs.openUploadStream(filename), { contentType: 'binary/octet-stream' })
    .on('error', (error) => {
      console.log('Error occured error');
      throw error;
    })
    .on('finish', () => {
      console.log(`done uploading ${filename}`);
      return file.name;
    });

  if (!a.filename) {
    throw 'Não salvou o arquivo';
  }
  return a.filename;
};

exports.baixarArquivoGridFS = fileName => new Promise((resolve, reject) => {
  try {

    let rstream, gfs, bufs = [];

    gfs = new mongoose.mongo.GridFSBucket(mongoGridFSDB.db, {
      chunkSizeBytes: 1024,
      bucketName: 'fs'
    });

    rstream = gfs.openDownloadStreamByName(
      fileName,
      {
        readPreference: 'primaryPreferred',
        w: 'w'
      }
    );

    rstream.on('data', (chunk) => {
      bufs.push(chunk);
    }).on('error', (err) => {
      reject(err);
    }).on('end', () => {

      let fbuf = Buffer.concat(bufs);
      let File = (fbuf.toString('hex'));

      resolve(File);
    });
  } catch (error) {
    console.log(error);
  }
});