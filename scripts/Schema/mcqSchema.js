const mongoose = require("mongoose");
const { Schema } = mongoose;

const mcqSchema = new Schema({
    data: String,
});

const MCQ = mongoose.model("MCQS", mcqSchema);

module.exports = MCQ;
