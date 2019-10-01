const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { RequiredString, RequiredDate } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  activities: [{
    type: String
  }],
  launchDate: RequiredDate,
  stops: [{
    stop: {
      type: ObjectId,
      ref: 'Stop'
    }
  }]
});

module.exports = mongoose.model('Tour', schema);