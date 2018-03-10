const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "ident_fabio"
});

module.exports = {
  selectAllInterests: page => {
    return new Promise((resolve, reject) => {
      const rowsLimit = 30;

      connection.query(
        `SELECT * FROM interest LIMIT ${page * rowsLimit}, ${rowsLimit}`,
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
};
