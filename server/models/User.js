const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

email:{
    type:'string',
    required: true,
    unique: true,

},
password:{
    type:'string',
    required: true,
},
name:{
    type:'string',
    required: true,
},


});
const User = mongoose.model('User',userschema);
module.exports = User;