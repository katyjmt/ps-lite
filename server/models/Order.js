const { Schema, model } = require('mongoose');
const Design = require('./Design');
const User = require('./User');

const designSchema = new Schema({
  design: [{
    type: Schema.Types.ObjectId, 
    ref: 'Design'
  }],
  user: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  pdf: {
    type: String,
    required: true,
  }
}, 
{ timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;