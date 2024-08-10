const sqlite3 = require('sqlite3').verbose();

// 打开数据库连接（如果数据库不存在，它将被创建）
const db = new sqlite3.Database('./data.db');

// 动态构建查询语句并执行查询
function query(params) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM data WHERE 1=1'; // `1=1` 是为了便于拼接其他条件
    let queryParams = [];

    if (params.name) {
      sql += ' AND name LIKE ?';
      queryParams.push(`%${params.name}%`);
    }

    if (params.id) {
      sql += ' AND id = ?';
      queryParams.push(params.id);
    }

    // 执行查询
    db.all(sql, queryParams, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// 导出查询函数
module.exports = {
  query
};

// 在模块被要求时关闭数据库连接
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
    } else {
      console.log('Database connection closed');
    }
  });
});