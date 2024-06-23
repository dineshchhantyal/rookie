const { Client, MessageEmbed } = require("discord.js");
const getMessagesFromChannel = require("../scripts/functions/ChannelMessages");
const getTeam = require("../scripts/functions/Team");
const addToken = require("../scripts/helpers_functions/addToken");

const msgSchema = require("../scripts/helpers_functions/msgSchema");
const quoteReply = require("../scripts/reply/quote");
require("dotenv").config();

const Bot = () => {
  const client = new Client();

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
      } else if (type.trim().startsWith("messages")) {
        getMessagesFromChannel(msg, type);
      } else if (type.trim().startsWith("team")) {
        getTeam(msg, type.trim());
      } else if (type.trim().startsWith("token")) {
        addToken(msg, type.trim());
      }
    }
  });
  client.login(process.env.DISCORD_ACCESS_TOKEN);
};

module.exports = Bot;
