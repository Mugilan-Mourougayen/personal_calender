require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const uri = process.env.MONGO_DB_URL;
const cors = require('cors');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
const calenderRouter = require("./routes/calender");
const login = require("./routes/login")
app.use("/users", login);
app.use("/calender", calenderRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  mongoose.connect(uri)
  .then(() => console.log('Connected!'));
})