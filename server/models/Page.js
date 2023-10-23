const { Schema, model } = require('mongoose');
const Category = require('./Category');

const pageSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  page_count: {
    type: Number,
    required: true,
  }
}, 
{ timestamps: true }
);

const Page = model('Page', pageSchema);

module.exports = Page;