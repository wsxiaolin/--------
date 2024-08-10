const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

// 打开数据库连接
const dbPath = "./data.db";
const db = new sqlite3.Database(dbPath);

// 将 db.all 转换为基于 promise 的方法
const dbAll = promisify(db.all.bind(db));

// 查询函数
async function search(keys, limit = 20) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  const placeholders = keys
    .map(
      () =>
        "(primaryDiscipline LIKE ? OR secondaryDiscipline LIKE ? OR keyWords LIKE ?)"
    )
    .join(" OR ");
  const query = `
        SELECT *
        FROM data
        WHERE ${placeholders}
        ORDER BY RANDOM()
        LIMIT ?;
    `;

  // 创建查询参数
  const params = keys.flatMap((key) => [`%${key}%`, `%${key}%`, `%${key}%`]);
  params.push(limit);

  try {
    // 执行查询并返回结果
    return await dbAll(query, params);
  } catch (err) {
    console.error("Error fetching records:", err.message);
    throw err;
  }
}

// 关闭数据库连接
process.on("exit", () => {
  db.close();
});

// 导出模块
module.exports = search;
