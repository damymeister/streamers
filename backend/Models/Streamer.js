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

const streamerValidationSchema = Joi.object({
    name: Joi.string().required(),
    platform: Joi.string().required(),
    description: Joi.string().required(),
  });

module.exports = {Streamer,streamerValidationSchema};