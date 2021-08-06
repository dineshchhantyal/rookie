const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema({
    name: String,
    rollno: String,
    token: String,
});

const Tokens = mongoose.model("Tokens", tokenSchema);

module.exports = Tokens;
