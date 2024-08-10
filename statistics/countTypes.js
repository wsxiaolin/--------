const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

const countAndSortTypes = () => {
  const primaryCounts = {};
  const secondaryCounts = {};

  // 读取所有记录
  db.all('SELECT primaryDiscipline, secondaryDiscipline FROM data', [], (err, rows) => {
    if (err) {
      throw err;
    }

    // 处理 primaryDiscipline 列
    rows.forEach(row => {
      const primaryDisciplines = JSON.parse(row.primaryDiscipline || '[]');
      primaryDisciplines.forEach(type => {
        primaryCounts[type] = (primaryCounts[type] || 0) + 1;
      });

      // 处理 secondaryDiscipline 列
      const secondaryDisciplines = JSON.parse(row.secondaryDiscipline || '[]');
      secondaryDisciplines.forEach(type => {
        secondaryCounts[type] = (secondaryCounts[type] || 0) + 1;
      });
    });

    // 按数量从多到少排序
    const sortedPrimaryCounts = Object.entries(primaryCounts)
      .sort((a, b) => b[1] - a[1]);
    const sortedSecondaryCounts = Object.entries(secondaryCounts)
      .sort((a, b) => b[1] - a[1]);

    // 输出排序后的统计结果
    console.log('Primary Discipline Counts (sorted):');
    sortedPrimaryCounts.forEach(([type, count]) => {
      console.log(`${type}: ${count}`);
    });

    console.log('\nSecondary Discipline Counts (sorted):');
    sortedSecondaryCounts.forEach(([type, count]) => {
      console.log(`${type}: ${count}`);
    });
  });
};

// 统计并排序类型数量
countAndSortTypes();

// 关闭数据库连接
db.close((err) => {
  if (err) {
    console.error('Error closing database', err);
  }
});