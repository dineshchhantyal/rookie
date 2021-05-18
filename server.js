const Discord = require("discord.js");
require("dotenv").config();

const quoteGenerator = require("./scripts/quoteGenerator");

const client = new Discord.Client();

const Bot = () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", async (msg) => {
    console.log("Incoming Message ===> ", msg.content);
    const msg_lower = msg.content.toLowerCase();

    const [invoke, type] = msg_lower.split("!");
    if (invoke.trim() === "roo") {
      if (type.trim() == "quote") {
        const reply = await quoteGenerator();
        console.log("Reply >>>", reply);
        console.log("Outgoing Message ===> ", reply);
        msg.reply(reply);
      }
    }
  });

  client.login(process.env.ACESS_TOKEN);
};

Bot();
