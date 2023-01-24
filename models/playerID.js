const mongoose = require("mongoose");

const playerIDSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
});

playerIDSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PlayerID ", playerIDSchema);
