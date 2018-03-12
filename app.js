const queries = require("./queries");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

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

app.patch("/remap", (req, res) => {
  const suggestionId = req.body.suggestionId;
  const interestId = req.body.interestId;

  queries
    .remap(suggestionId, interestId)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
