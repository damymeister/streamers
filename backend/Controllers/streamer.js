const router = require("express").Router();
const { Streamer} = require("../Models/Streamer");

router.get("/:streamerId", async (req, res) => {
    try {
        const { streamerId } = req.params;
        const streamerDB = await Streamer.findById(streamerId);
        if (!streamerDB) {
            return res.status(404).send({ message: "Streamer not found" });
        }
        res.status(200).send(streamerDB);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

module.exports = router;