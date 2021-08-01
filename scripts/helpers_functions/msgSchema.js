const { MessageEmbed } = require("discord.js");

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
  console.log("Sending thuis....", body);
};

module.exports = msgSchema;
