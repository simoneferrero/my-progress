const fs = require("fs");
const path = require("path");

const executeSql = (fileName, db, callback) => {
  const filePath = path.resolve(`./migrations/sqls/${fileName}.sql`);
  return fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) return console.log(err);
    db.runSql(data, (err) => {
      if (err) return console.log(err);
      callback();
    });
  });
};

module.exports = executeSql;
