const User = require("../models/User");
const Availablity = require("../models/Availablity");
const Reservation = require("../models/Reservation");

const getavailablity = async function (req, res, next) {
  try {
    const date = req.body.date; 

    const availabilities = await Availablity.findOne({ date });
    console.log(availabilities)

    res.status(200).json(availabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching availabilities.' });
  }
};

const updateavailablity = async function (req, res, next) {
  try {
    const date = req.body.date; 
    const email = req.body.email;
    const availability = req.body.availability;
    console.log(res.body)

    const availabilities = await Availablity.findOne({ date });
    if(availabilities){
      availabilities.schedule = availability;
      const updatedav = await availabilities.save();
      res.status(200).json({msg:"upadted"})
    }else{
      const tempav = new Availablity({ date:date, email:email, schedule: availability });
      const newav = await tempav.save();
      res.status(200).json({msg:"created"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' error occurred ' });
  }
};




const getreservation = async function (req, res) {
  try {
    const date = req.body.date; 

    const reservations = await Reservation.findOne({ date });
    console.log(reservations)

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching availabilities.' });
  }
};

const updatereservation = async function (req, res) {
  try {

    console.log(req.body)
    const date = req.body.date
    const reservation = req.body.availability

    const reservations = await Reservation.findOne({ date });
    if(reservations){
      const updatedre = await Reservation.updateOne(
        { date: date },
        { $push: { schedule: reservation} }
     )
      res.status(200).json({msg:"upadted"})
    }else{
      const tempre = new Reservation({ date:date, schedule: reservation });
      const newav = await tempre.save();
      res.status(200).json({msg:"created"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' error occurred ' });
  }

};




const deletereservation = async function (req, res) {
  try {
    const date = req.body.date;
    const delid = req.body.deletitem 
    const reservation = await Reservation.findOne({ date });

    if (!reservation) {
      throw new Error('Reservation not found for the given date');
    }

    reservation.schedule = reservation.schedule.filter(item => item.id !== delid);

    const updatedReservation = await reservation.save();
      res.status(200).json({msg:"deleted"})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' error occurred ' });
  }

};




const deleteavailablity = async function (req, res) {
  try {
    const date = req.body.date;
  
    const reservation = await Availablity.findOneAndDelete({ date });

    if (!reservation) {
      res.status(409).json({msg:"not match found"})
    }else{
      res.status(200).json({msg:"deleted"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' error occurred ' });
  }

};

module.exports = { getavailablity,updateavailablity ,getreservation ,updatereservation,deletereservation,deleteavailablity};