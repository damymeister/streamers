require('dotenv').config()
const streamersRoutes = require("./Controllers/streamers")
const streamerRoutes = require("./Controllers/streamer")
const express = require("express")
const app = express()
const dbConnect = require("./db.js")
const cors = require('cors')
app.use(cors())
const bodyParser = require("body-parser");

app.use(bodyParser.json());
dbConnect();

app.use(express.json())
app.use("/streamers", streamersRoutes)
app.use("/streamer", streamerRoutes)
app.listen(5000, () => {
  console.log("Server started on port 5000")
});