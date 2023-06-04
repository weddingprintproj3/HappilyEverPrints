const mongoose = require('mongoose');

const { Schema } = mongoose;
const textSchema = require('./Textfield');
const groupSchema = require('./GroupFields');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  textFields: [textSchema],
  groupFields: [groupSchema],
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
