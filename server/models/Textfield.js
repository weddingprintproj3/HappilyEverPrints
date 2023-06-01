const { Schema } = require('mongoose');


const textSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
});

module.exports = textSchema;