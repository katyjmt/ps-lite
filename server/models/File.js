const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
  page: {
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  },
  pdf: {
    type: String,
    required: true,
  },
  jpg: [{
    type: String,
    required: true,
  }],
  internal_id: {
    type: Number,
    required: true,
  },
}, 
{ timestamps: true }
);

const File = model('File', fileSchema);

module.exports = File;