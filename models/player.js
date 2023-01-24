const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  blocks: { type: Number, default: 0 },
  freeThrowPct: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  rebounds: { type: Number, default: 0 },
  threepts: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
  plusMinus: { type: Number, default: 0 },
});

playerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Player", playerSchema);
