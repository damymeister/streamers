const mongoose = require("mongoose")
require('dotenv').config()
function dbConnect() {
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log("Connected to MongoDB database.")
    }).catch((err) => {
      console.log("Unable to connect to the MongoDB database. Error: " + err)
    })
}

module.exports = dbConnect