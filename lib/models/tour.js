const mongoose = require('mongoose');
const { Schema } = mongoose;
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
    location: {
      latitude: Number,
      longitude: Number
    },
    weather: {
      temperature: Number,
      summary: String
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

module.exports = mongoose.model('Tour', schema);