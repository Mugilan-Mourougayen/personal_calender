const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: {
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
      email:{
        type: String, 
        required: true,
      },
      title:{
        type: String, 
        required: true,
      }
    },
  ],
});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
