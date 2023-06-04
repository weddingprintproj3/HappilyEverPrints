const { Schema } = require('mongoose');


const textSchema = new Schema({
  label: {
    type: String,
  },
  input: {
    type: String,
  },
});

module.exports = textSchema;