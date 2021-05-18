const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

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
  console.log(msg);
  const msg_lower = msg.content.toLowerCase();
  console.log(msg_lower);
  var reply_code = Math.floor(Math.random() * reply.length);
  if (msg_lower("welcome roo!") || msg_lower("roo! welcome")) {
    msg.reply(reply[reply_code]);
    return;
  }
  if (msg_lower.includes("roo!")) {
    msg.reply(reply[reply_code]);
  }
});

client.login(process.env.ACESS_TOKEN);
