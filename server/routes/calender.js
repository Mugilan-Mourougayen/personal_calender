const express = require("express");
const router = express.Router();
const {
    getavailablity,
    updateavailablity,
    updatereservation,
    getreservation,
    deletereservation,
    deleteavailablity
  
} = require("../controllers/calendercontroller")



router.post("/availablity", getavailablity);
router.post("/addavailablity", updateavailablity);
router.post("/addreservarion", updatereservation);
router.post("/getreservation", getreservation);
router.delete("/deletereservarion", deletereservation);
router.delete("/availablity", deleteavailablity);


module.exports = router;