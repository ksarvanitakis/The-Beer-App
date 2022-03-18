const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/:country", (req, res) => {
  var options = {
    method: "GET",
    url: `https://beer-lover.p.rapidapi.com/search/country/${req.params.country}`,
    headers: {
      "x-rapidapi-host": "beer-lover.p.rapidapi.com",
      "x-rapidapi-key": "c79045ae5cmshe90c95ea12ab5adp1efe7fjsn09550276d987",
    },
  };

  axios.request(options).then((response) => res.json(response.data));

});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));