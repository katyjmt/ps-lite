const { Schema, model } = require('mongoose');

const pageSchema = new Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  internal_id: {
    type: Number,
    required: true,
    unique: true,
  }

}, 
{ timestamps: true }
);

const Page = model('Page', pageSchema);

module.exports = Page;