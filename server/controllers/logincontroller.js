const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = 'naruto';

const verifylogin = async function (req, res) {
  try {
    const email =  req.body.email;
    const password =  req.body.password;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const check = await bcrypt.compare(password, existingUser.password);
        if(check){
            const token = jwt.sign(email,JWT_SECRET_KEY);
            return res.status(200).json({ message: 'User registered successfully.', token });
        }
        else{
            return res.status(409).json({ message: 'Invalid password' });
        }
    }else{
        return res.status(409).json({ message: 'User Doesnot exist' });
    }
    res.json({ data: "success"});
  } catch (err) {
    console.error(err);
  }
};
const createlogin = async function (req, res) {
    try {
      console.log(req.body)
        const email =  req.body.email;
        const password =  req.body.password;
        const name =req.body.name;
    
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const tempUser = new User({ name:name, email:email, password: hashedPassword });
            const newUser = await tempUser.save();
            if(newUser){
                const token = jwt.sign(email,JWT_SECRET_KEY);
                res.status(200).json({ message: 'User registered successfully.', token });
            }
            else{
                return res.status(409).json({ message: 'user not created' });
            }
        }else{
            return res.status(409).json({ message: 'User already exist' });
        }
        res.json({ data: "success"});
      } catch (err) {
        console.error(err);
      }
  };




module.exports = { verifylogin, createlogin };