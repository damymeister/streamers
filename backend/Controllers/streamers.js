const router = require("express").Router();
const { Streamer, streamerValidationSchema } = require("../Controllers/streamers");

router.post("/", async (req, res) => {
  try {
    const { error } = streamerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const existingStreamer = await Streamer.findOne({ name: req.body.name });
    if (existingStreamer) {
      return res.status(409).json({ message: "Streamer with the given name already exists!" });
    }

    await new Streamer({ ...req.body }).save();
    res.status(201).json({ message: "Streamer created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
    try {
      const streamers = await Streamer.find();
      if (!streamers.length) {
        return res.status(404).send({ message: "Database is empty" });
      }
      res.json(streamers);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch streamers from the database." });
    }
  });
  
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

router.put("/:streamerId/vote", async (req, res) => {
    try {
      const { streamerId } = req.params;
      const { voteType } = req.body;
      const streamer = await Streamer.findById(streamerId);
      if (!streamer) {
        return res.status(404).json({ error: "Streamer with specified ID not found." });
      }
  
      if (voteType === "upvote") {
        streamer.upvotes++;
      } else if (voteType === "downvote") {
        streamer.downvotes++;
      } else {
        return res.status(400).json({ error: "Incorrect type of vote." });
      }
  
      const updatedStreamer = await streamer.save();
      res.json(updatedStreamer);
    } catch (error) {
      res.status(500).json({ error: "There was an error while voting for the streamer." });
    }
  });
  

module.exports = router;
