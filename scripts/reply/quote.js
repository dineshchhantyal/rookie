const msgSchema = require("../helpers_functions/msgSchema");
const quoteGenerator = require("../helpers_functions/quoteGenerator");

const quoteReply = async (msg) => {
  const quote = await quoteGenerator();
  msgSchema(msg, quote.content);
};

module.exports = quoteReply;
