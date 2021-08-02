// const unirest = require("unirest");
const axios = require("axios");

const quoteGenerator = () => {
  const quoteURL = "https://quotes15.p.rapidapi.com/quotes/random/";

  const options = {
    method: "GET",
    url: quoteURL,
    headers: {
      "x-rapidapi-key": process.env.XRAPIDAPIKEY,
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then((response) => response.data)
    .catch((error) => error);
};

module.exports = quoteGenerator;
