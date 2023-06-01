const mongoose = require('mongoose');

const { Schema } = mongoose;
const textSchema = require('./Textfield');
const modSchema = require('./Mod');

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
  mods: [modSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
