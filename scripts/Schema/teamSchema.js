const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  members: [String],
  projectName: String,
  description: {
    info: String,
    link: String,
    image: String,
  },
});

const Teams = mongoose.model("Teams", teamSchema);

module.exports = Teams;
