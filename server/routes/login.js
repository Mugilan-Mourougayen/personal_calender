const express = require("express");
const router = express.Router();
const {
    verifylogin,
    createlogin
  
} = require("../controllers/logincontroller");


router.post("/login", verifylogin);
router.post("/register", createlogin);
 

module.exports = router;