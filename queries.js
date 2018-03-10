const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "ident_fabio"
});

module.exports = {
  selectAllInterests: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM interest", (error, results, fields) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};
