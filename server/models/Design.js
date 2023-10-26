const { Schema, model } = require('mongoose');

// Design document is first created when cover, start month and end month have all been selected (required: true)
const designSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  start_month: {
    type: Date,
    required: true,
  },
  end_month: {
    type: Date,
    required: true,
  },
  pages: [{
    type: Schema.Types.ObjectId, 
    ref: 'Page'
  }],
  cover: {
    type: String,
    required: true,
  }
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