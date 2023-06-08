const { Schema } = require('mongoose');


const modSchema = new Schema({
  element_id: {
    type: String,
    required: true,
  },
  posTop: {
    type: String,
    required: true,
  },
  posLeft: {
    type: String,
    required: true,
  },
});

module.exports = modSchema;