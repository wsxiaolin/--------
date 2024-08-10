const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data.db");

function insert(data) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO data (
      id, name, contentLength, userID, userName, editorID, editorName,
      year, summary, primaryDiscipline, secondaryDiscipline, keyWords, readability
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      data.id,
      data.name,
      data.contentLength,
      data.userID,
      data.userName,
      data.editorID,
      data.editorName,
      data.year,
      data.summary,
      data.primaryDiscipline,
      data.secondaryDiscipline,
      data.keyWords,
      data.readability,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        console.error("Error inserting data:", err.message);
        reject(err);
      } else {
        console.log(`Data inserted with ID: ${this.lastID}`);
        resolve(this.lastID);
      }
    });
  });
}

module.exports = {
  insert,
};

// 在模块被要求时关闭数据库连接
process.on("exit", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    } else {
      console.log("Database connection closed");
    }
  });
});
