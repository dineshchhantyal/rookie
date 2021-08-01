const mongoose = require("mongoose");
const Bot = require("./rookie");

require("dotenv").config();

const Database = () => {
  const dbConnetion = `mongodb+srv://077-BCT:${process.env.DBPASSWORD}@cluster0.r7knx.mongodb.net/studentCollection?retryWrites=true&w=majority`;

  mongoose.connect(dbConnetion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("DB is connected");
  });
};

Bot();
