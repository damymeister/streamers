const mongoose = require("mongoose")
DB="mongodb+srv://damymeister:skubi780301@damymeister.x3avjgu.mongodb.net/streamers?retryWrites=true&w=majority"

function dbConnect() {
  mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log("Połączono z bazą")
    }).catch((err) => {
      console.log("Nie można połączyć się z MongoDB. Błąd: " + err)
    })
}

module.exports = dbConnect