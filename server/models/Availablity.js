const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  schedule: [
    {
      id: {
        type: String, 
        required: true,
      },
      start: {
        type: String, 
        required: true,
      },
      end: {
        type: String, 
        required: true,
      },
    },
  ],
});


const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
