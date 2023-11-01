const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user_email: {
    type: String
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