const { Schema } = require('mongoose');


const modSchema = new Schema({
  attribute: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = modSchema;