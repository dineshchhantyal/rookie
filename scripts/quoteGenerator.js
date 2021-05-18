// const unirest = require("unirest");
const axios = require("axios");

const quoteGenerator = () => {
  const quoteURL = "https://quotes15.p.rapidapi.com/quotes/random/";

  const options = {
    method: "GET",
    url: quoteURL,
    headers: {
      "x-rapidapi-key": "5ee69e56c0msh0d7faa18e65f498p1bd58fjsn0244394c7ad3",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then((response) => response.data)
    .catch((error) => error);
};

module.exports = quoteGenerator;
