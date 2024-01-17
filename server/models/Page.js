const { Schema, model } = require('mongoose');

const pageSchema = new Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  files: [{
    type: Schema.Types.ObjectId, 
    ref: 'File'
  }],
  internal_id: {
    type: String,
    required: true,
    unique: true,
  }

}, 
{ timestamps: true }
);

const Page = model('Page', pageSchema);

module.exports = Page;