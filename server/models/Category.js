const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, 
{ timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;