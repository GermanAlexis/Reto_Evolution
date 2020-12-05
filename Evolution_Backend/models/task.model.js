const { Schema, model,SchemaTypes } = require('mongoose');

const taskSchema = Schema({
  nameTask: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'Users',
  }
});

taskSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject(); // destructuring of Objetc 
  object.tid = _id;
  return object;
});

module.exports = model('Tasks', taskSchema);