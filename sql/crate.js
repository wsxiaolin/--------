const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath ="./data.db";
const db = new sqlite3.Database(dbPath);

db.close();

const dbNew = new sqlite3.Database(dbPath);

const alterTableQuery = `
CREATE TABLE IF NOT EXISTS data (
    id TEXT PRIMARY KEY,
    name TEXT,
    contentLength INTEGER,
    userID TEXT,
    userName TEXT,
    editorID TEXT,
    editorName ID,
    year INTEGER,
    summary TEXT,
    primaryDiscipline TEXT,
    secondaryDiscipline TEXT,
    keyWords TEXT,
    readability REAL
);
`;

dbNew.run(alterTableQuery, function (err) {
  if (err) {
    return console.error("修改表结构出错:", err.message);
  }
  console.log("表结构修改成功");
});

dbNew.close();
