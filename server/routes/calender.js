const express = require("express");
const router = express.Router();
const {
    getavailablity,
   
  
} = require("../controllers/calendercontroller")



router.get("/availablity", getavailablity);

 

module.exports = router;