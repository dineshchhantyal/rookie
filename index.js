const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

const Bot = () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  const reply = [
    "Aafu Chahi Padni Malai Kaam Nadine? ✍",
    "Malaii Jhau Layo 😴",
    "I lop U 💘",
    "Stay Safe 🦺",
    "K Cha Nanu Timro Kharab 👄",
  ];
  client.on("message", (msg) => {
    const msg_lower = msg.content.toLowerCase();
    var reply_code = Math.floor(Math.random() * reply.length);

    if (msg_lower.includes("roo!")) {
      msg.reply(reply[reply_code]);
    }
  });

  client.login(process.env.ACESS_TOKEN);
};

Bot();
