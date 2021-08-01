const msgSchema = require("../helpers_functions/msgSchema");

const getMessagesFromChannel = async (msg, type) => {
  const messages = await msg.channel.messages.fetch({ limit: 100 });
  const messagesArray = messages.array();
  console.log(type);
  const finalArray = messagesArray.map((m, index) => {
    if ((m.author.bot || m.content == " ", m.content.startsWith("!roo "))) {
      index++;
    } else {
      return {
        author: m.author.username,
        content: m.content,
      };
    }
  });
  console.log(finalArray);
  msgSchema(
    msg,
    "**Pg no:1** \n \n```json\n \n" +
      JSON.stringify(finalArray.slice(0, 20), null, 2) +
      "\n```"
  );
  msgSchema(
    msg,
    " **Pg no:2** \n \n ```json\n \n" +
      JSON.stringify(finalArray.slice(20, 40), null, 2) +
      "\n```"
  );
  msgSchema(
    msg,
    "**Pg no:3** \n \n ```json\n \n" +
      JSON.stringify(finalArray.slice(40, 60), null, 2) +
      "\n```"
  );
  msgSchema(
    msg,
    "**Pg no:4** \n \n ```json\n \n" +
      JSON.stringify(finalArray.slice(60, 80), null, 2) +
      "\n```"
  );
  msgSchema(
    msg,
    "**Pg no:5** \n \n ```json\n \n" +
      JSON.stringify(finalArray.slice(80, 99), null, 2) +
      "\n```"
  );

  //   console.log(finaArray.slice(-50));
  //   msgSchema(msg, "```json \n " + JSON.stringify(finaArray.slice(-50)) + "\n");
};

module.exports = getMessagesFromChannel;
