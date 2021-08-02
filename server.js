const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const Bot = require("./rookie");
const build = require("./config.js");

const app = express();
const port = process.env.PORT || 5000;
const team = require("./scripts/routes/team");

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
if (build == "prod") {
  dbConnection = `mongodb+srv://rookie:${process.env.DBPASSWORD}@cluster0.kjvqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  `;
} else {
  dbConnection = `mongodb://localhost:27017/rookie`;
}
mongoose.connect(
  dbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
  }
);


mongoose.connection.once("open", () => {
  console.log("DB is connected");
});

app.post("/webhook", async (req, res) => {
  const Payload = req.body;
  //Respond To Heroku Webhook
  res.sendStatus(200);

  const options = {
    method: "POST",
    url:
      process.env.DISCORDHOOKURL,
    headers: {
      "Content-type": "application/json",
    },
    //Format JSON DATA
    body: JSON.stringify({
      content: `This is A Webhook notification!A build for your app ${Payload.data.app.name} was just triggered`,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response);
  });
});
Bot();
app.use("/team", team);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
