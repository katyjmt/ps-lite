const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
  pages: [{
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  }],
  type: {
    type: String,
    required: true,
  },
  app_order: {
    type: Number,
    required: true,
    unique: true,
  }
}, 
{ timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;