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
const token = require("./scripts/routes/token");
const mcq = require("./scripts/routes/mcq");

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors(
  {
    origin: "*",
  }
));

dbConnection = build == "prod" ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

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
app.get("/", (req, res) => {
  res.json({ message: "Ramro Bato Ma Chas" });
})
app.post("/webhook", async (req, res) => {
  const Payload = req.body;
  //Respond To Heroku Webhook
  res.sendStatus(200);

  const options = {
    method: "POST",
    url:
      process.env.DISCORD_HOOK_URL,
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
app.use("/token", token)
app.use("/mcq", mcq);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
