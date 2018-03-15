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
        ? `SELECT * FROM interest WHERE name LIKE '%${searchTerm}%' OR abbr LIKE '%${searchTerm}%' ORDER BY name ASC LIMIT ${page *
            rowsLimit}, ${rowsLimit}`
        : `SELECT * FROM interest ORDER BY name ASC LIMIT ${page *
            rowsLimit}, ${rowsLimit}`;

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
        ? `SELECT * FROM interest_suggestion WHERE name LIKE '%${searchTerm}%' ORDER BY name ASC LIMIT ${page *
            rowsLimit}, ${rowsLimit}`
        : `SELECT * FROM interest_suggestion ORDER BY name ASC LIMIT ${page *
            rowsLimit}, ${rowsLimit}`;

      connection.query(query, (error, results, fields) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  remap: (suggestionName, interestId) => {
    let suggestionIds = [];
    const getIds = `SELECT ID FROM interest_suggestion WHERE name LIKE '%${suggestionName}%'`;

    return new Promise((resolve, reject) => {
      connection
        .query(getIds)
        .on("result", row => {
          suggestionIds.push(row.ID);
        })
        .on("end", () => {
          if (!suggestionIds.length) return resolve([]);

          suggestionIds = suggestionIds.join(",");

          const removeSuggestion =
            `DELETE FROM interest_suggestion ` +
            `WHERE ID IN (${suggestionIds})`;

          const remap =
            `UPDATE interest_user SET interestID = ${interestId}, ` +
            `interestIsSuggestion = 0 ` +
            `WHERE interestID IN (${suggestionIds}) AND interestIsSuggestion = 1`;

          const query = `${removeSuggestion};${remap}`;

          connection.query(query, (error, results, fields) => {
            if (error) return reject(error);
            resolve(results);
          });
        });
    });
  }
};
