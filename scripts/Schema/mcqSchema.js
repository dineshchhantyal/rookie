const mongoose = require("mongoose");
const { Schema } = mongoose;

const mcqSchema = new Schema({
    data: String,
    uploadDate: { type: Date, default: Date.now },
});

const MCQ = mongoose.model("MCQS", mcqSchema);

module.exports = MCQ;
