const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASEHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = {
  selectAllInterests: (page = 0, searchTerm) => {
    return new Promise((resolve, reject) => {
      const rowsLimit = 30;
      const query = searchTerm
        ? `SELECT * FROM interest WHERE name LIKE '%${searchTerm}%' OR abbr LIKE '%${searchTerm}%' LIMIT ${page *
            rowsLimit}, ${rowsLimit}`
        : `SELECT * FROM interest LIMIT ${page * rowsLimit}, ${rowsLimit}`;

      connection.query(query, (error, results, fields) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  selectAllSuggestions: (page = 0, searchTerm) => {
    return new Promise((resolve, reject) => {
      const rowsLimit = 30;
      const query = searchTerm
        ? `SELECT * FROM interest_suggestion WHERE name LIKE '%${searchTerm}%' LIMIT ${page *
            rowsLimit}, ${rowsLimit}`
        : `SELECT * FROM interest_suggestion LIMIT ${page *
            rowsLimit}, ${rowsLimit}`;

      connection.query(query, (error, results, fields) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};
