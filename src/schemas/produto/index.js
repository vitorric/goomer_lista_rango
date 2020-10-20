const { Schema } = require('mongoose'),
  ObjectId = Schema.ObjectId,
  { mongoDB } = require('../../conn/index');

const ProdutoSchema = new Schema(
  {
    restauranteId: {
      type: ObjectId,
      ref: 'Restaurante',
    },
    nome: {
      type: String,
      required: true
    },
    foto: {
      type: String
    },
    preco: {
      type: Number,
      required: true
    },
    categoria: {
      type: String,
      required: true
    },
    promocoes: [{
      descricao: {
        type: String
      },
      preco: {
        type: Number,
        required: true
      },
      dia: {
        type: String,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        required: true
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
    collection: 'Produto',
    timestamps: true
  }
);

exports.Produto =  mongoDB.model('Produto', ProdutoSchema);
