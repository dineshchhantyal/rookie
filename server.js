const { Client, MessageEmbed } = require("discord.js");
require("dotenv").config();

const quoteGenerator = require("./scripts/quoteGenerator");

const client = new Client();

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
        const quote = await quoteGenerator();
        console.log("quote >>>", quote);
        console.log("Outgoing Message ===> ", quote);
        console.log(msg);
        const embed = new MessageEmbed()
          .setTitle(msg.author.username)
          .setColor(0xff0000)
          .setDescription(quote.content);
        msg.channel.send(embed);
      }
    }
  });

  client.login(process.env.ACESS_TOKEN);
};

Bot();
