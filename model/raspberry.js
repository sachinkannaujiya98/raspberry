const mongoose = require("mongoose");
const { Schema } = mongoose;
const raspberrySchema = new Schema({
  ip: {
    type: String,
  },
  name: {
    type: String,
  },
});
const Raspberry = mongoose.model("Raspberry", raspberrySchema);
module.exports = Raspberry;
