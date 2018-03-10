const queries = require("./queries");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("iDent Challenge API");
});

app.get("/interests", (req, res) => {
  queries.selectAllInterests().then(data => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
