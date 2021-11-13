const mongoose = require('mongoose');

const { Schema } = mongoose;

const shiftSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  hours: {
    type: Number,
    min: 8,
    default: 8
  },
  shiftDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },

});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
