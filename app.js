const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "ident_fabio"
});

connection.connect();

connection.query("SELECT * FROM interest", (error, results, fields) => {
  if (error) throw error;
  console.log(results.length);
});

connection.end();
