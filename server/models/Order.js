const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  orderQuantity: {
    type: Number,
    min: 0,
  },
  product:{
      type: Schema.Types.ObjectId,
      ref: 'Product',
  },
  status:{
    type: String,
    enum : ['PENDING','COMPLETED'],
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
