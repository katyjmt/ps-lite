const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
  page_id: {
    type: String
  },
  pdf: [{
    type: String,
    required: true,
  }],
  jpg: [{
    type: String,
  }],
  yearMonthDay: {
    type: Number,
  },

  // When user selects Start Month and End Month in front-end, these will provide
  // the isoWeek and isoYear each day within the period. If a weekly page layout 
  // is selected by the user, the query will fetch page files matching unique
  // isoYearWeek values (for example 202252, 20231, 20232 would be for the first
  // 3 weeks of 2023)
  isoYearWeek: {
    type: Number,
  },
  internal_id: {
    type: String,
    required: true,
  },
}, 
{ timestamps: true }
);

const File = model('File', fileSchema);

module.exports = File;