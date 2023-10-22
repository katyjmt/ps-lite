const { Schema, model } = require('mongoose');
const Page = require('./Page');

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pages: [{
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  }]
}, 
{ timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;