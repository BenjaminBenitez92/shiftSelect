const mongoose = require('mongoose');

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  shifts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shift'
    }
  ]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
