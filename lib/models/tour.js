const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { RequiredString } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  activities: [{
    type: String
  }],
  launchDate: {
    type: Date,
    default: () => new Date()
  },
  stops: [{
    stop: {
      type: ObjectId,
      ref: 'Stop'
    }
  }]
});

module.exports = mongoose.model('Tour', schema);