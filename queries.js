const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASEHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
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
  },

  remap: (suggestionId, interestId) => {
    const removeSuggestion = `DELETE FROM interest_suggestion WHERE ID = ${suggestionId}`;
    const remap =
      `UPDATE interest_user SET interestID = ${interestId},` +
      `interestIsSuggestion = 0 ` +
      `WHERE interestID = '${suggestionId}' AND interestIsSuggestion = 1`;

    const query = `${removeSuggestion};${remap}`;

    return new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};
