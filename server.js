const { Client, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

require("dotenv").config();

const quoteGenerator = require("./scripts/quoteGenerator");

const client = new Client();

const msgSchema = (msg, body, reply) => {
  const embed = new MessageEmbed()
    .setTitle(msg.author.username)
    .setColor(0xff0000)
    .setDescription(body);
  if (reply) {
    msg.reply(body);
  } else {
    msg.channel.send(embed);
  }
};
const quoteReply = async (msg) => {
  const quote = await quoteGenerator();
  msgSchema(msg, quote.content);
};

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
        quoteReply(msg);
      } else if (
        type.trim().startsWith("check") ||
        type.trim().startsWith("update")
      ) {
        msgSchema(
          msg,
          "I'm working on database!!! 💤💤 \n Everyone please provide your information. 🤐🤐\n "
        );
        // Database();
      }
    }
  });

  client.login(process.env.ACESS_TOKEN);
};

Bot();
