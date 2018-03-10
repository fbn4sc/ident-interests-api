const queries = require("./queries");

queries.selectAllInterests().then(data => {
  console.log(data.length);
});
