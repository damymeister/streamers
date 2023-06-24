const mongoose = require("mongoose")
const Joi = require("joi");

const streamerSchema = new mongoose.Schema({
name: { type: String, required: true },
platform: {type: String, required:true},
description:{ type: String, required: true },
upvotes: { type: Number, default: 0 },
downvotes: { type: Number, default: 0 },
})

const Streamer = mongoose.model("Streamer", streamerSchema)

const validate = (data) => {
  const schema = Joi.object({
      name: Joi.string().required().label("name"),
      platform: Joi.string().required().label("platform"),
      description: Joi.string().required().label("description"),
  })
return schema.validate(data)
  }
module.exports = {Streamer, validate};