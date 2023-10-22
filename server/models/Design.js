const { Schema, model } = require('mongoose');
const User = require('./User');
const Page = require('./Page');
const Order = require('./Order')

const designSchema = new Schema({
  user: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  page_selection: [{
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  }],
  cover_type: {
    type: String,
    required: true,
  },
  orders: [{
    type: Schema.Types.ObjectId, 
    ref: 'Order'
  }],
}, 
{ timestamps: true },
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
}
);

// Virtual called pageCount that retrieves the length of the page_selection arrays.
// ***** NOTE: THIS DOESN'T ACCOUNT FOR LENGTH OF PDF DOCS - COME BACK TO THIS
designSchema
  .virtual('pageCount')
  .get(function() {
    return this.page_selection.length;
  });

const Design = model('Design', designSchema);

module.exports = Design;