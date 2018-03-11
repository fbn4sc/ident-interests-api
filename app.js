const queries = require("./queries");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Interests API");
});

app.get("/interests", (req, res) => {
  queries
    .selectAllInterests(req.query.page, req.query.searchTerm)
    .then(data => {
      res.send(data);
    });
});

app.get("/suggestions", (req, res) => {
  queries
    .selectAllSuggestions(req.query.page, req.query.searchTerm)
    .then(data => {
      res.send(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
