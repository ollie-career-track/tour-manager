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

schema.statics = {
  addStop(id, stop) {
    return this.updateById(
      id,
      {
        $push: {
          stops: stop
        }
      }
    )
      .then(location => location.stops);
  },

  removeStop(id, stopId) {
    return this.updateById(id, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(location => location.stops);
  },

  updateStopAttendance(id, stopId, attendance) {
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.attendance': attendance
        }
      }
    )
      .then(location => location.stops);
  }
};

module.exports = mongoose.model('Tour', schema);