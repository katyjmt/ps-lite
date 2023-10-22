const { Schema, model } = require('mongoose');
const Category = require('./Category');

const pageSchema = new Schema({
  category: [{
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  }],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pdf_file: {
    type: String,
    required: true,
  },
  jpg_file: {
    type: String,
    required: true,
  }
}, 
{ timestamps: true }
);

const Page = model('Page', pageSchema);

module.exports = Page;