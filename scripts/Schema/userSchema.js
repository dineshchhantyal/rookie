const { User } = require("discord.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  number: [Number],
  message: String,
  interest: [String],
  workingOn: [String],
  maritalStatus: Boolean,
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
