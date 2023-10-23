const { Schema, model } = require('mongoose');
const Page = require('./Page');

const fileSchema = new Schema({
  page: {
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  },
  month: {
    type: Date,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  jpg: {
    type: String,
    required: true,
  }
}, 
{ timestamps: true }
);

const File = model('File', fileSchema);

module.exports = File;