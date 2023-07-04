const router = require("express").Router();
const { Streamer, validate } = require("../Models/Streamer");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const existingStreamer = await Streamer.findOne({ name: req.body.name });
    if (existingStreamer) {
      return res.status(409).json({ message: "Streamer with the given name already exists!" });
    }
    await new Streamer({ ...req.body }).save();
    const createdStreamer = await Streamer.findOne({ name: req.body.name });
    res.status(201).json({ message: "Streamer created successfully", streamer: createdStreamer });    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
    try {
      const { page, pageSize } = req.query;
      const pageNumber = parseInt(page) || 1;
      const streamersPerPage = parseInt(pageSize) || 4;
      const skip = (pageNumber - 1) * streamersPerPage;
      const streamers = await Streamer.find()
      .skip(skip)
      .limit(streamersPerPage);
      const totalStreamersCount = await Streamer.countDocuments(); 
      if (!streamers.length) {
        return res.status(404).send({ message: "Database is empty" });
      }
      res.json({streamers, totalStreamersCount});
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch streamers from the database." });
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
