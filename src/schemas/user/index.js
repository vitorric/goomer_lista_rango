const { Schema } = require('mongoose'),
  { mongoDB } = require('../../conn/index');

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: 1
    },
    delete: {
      type: Boolean,
      default: 0
    }
  }, {
    collection: 'User',
    timestamps: true
  }
);

exports.User =  mongoDB.model('User', UserSchema);
