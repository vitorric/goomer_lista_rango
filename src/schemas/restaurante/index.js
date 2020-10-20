const { Schema } = require('mongoose'),
  { mongoDB } = require('../../conn/index');

const RestauranteSchema = new Schema(
  {
    nome: {
      type: String,
      required: true
    },
    foto: {
      type: String
    },
    endereco: {
      rua: {
        type: String,
        required: true
      },
      numero: {
        type: String,
        required: true
      },
      bairro: {
        type: String,
        required: true
      },
      cidade: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      },
      cep: {
        type: String,
        required: true
      },
    },
    horarios_funcionamento: [{
      dia_inicio: {
        type: String,
        required: true,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
      },
      dia_fim: {
        type: String,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
      },
      horario_inicio: {
        type: Date,
        required: true
      },
      horario_fim: {
        type: Date,
        required: true
      }
    }]
  }, {
    collection: 'Restaurante',
    timestamps: true
  }
);

exports.Restaurante =  mongoDB.model('Restaurante', RestauranteSchema);
