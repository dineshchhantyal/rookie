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
  const dbConnetion = `mongodb+srv://077-BCT:${process.env.DBPASSWORD}@cluster0.r7knx.mongodb.net/studentCollection?retryWrites=true&w=majority`;
} else {
  dbConnetion = `mongodb://localhost:27017/rookie`;
}
mongoose.connect(
  dbConnetion,
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
     "https://discord.com/api/webhooks/XXXXXXXXXXXXXX",
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
  console.log(`Example app listening at http://localhost:${port}`);
});
