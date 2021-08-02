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
