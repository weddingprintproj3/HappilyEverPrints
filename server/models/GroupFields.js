const { Schema } = require('mongoose');


const groupSchema = new Schema({
  group: {
    type: String,
    required: true,
  },
  fields: {
    type: [String],
    required: true,
  },
});

module.exports = groupSchema;