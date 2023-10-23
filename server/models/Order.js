const { Schema, model } = require('mongoose');
const Design = require('./Design');
const User = require('./User');

const designSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  designs: [{
    type: Schema.Types.ObjectId, 
    ref: 'Design'
  }]
}, 
{ timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;