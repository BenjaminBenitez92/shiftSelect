const mongoose = require('mongoose');

const { Schema } = mongoose;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
