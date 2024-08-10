const sqlite3 = require('sqlite3').verbose();
const { createObjectCsvWriter } = require('csv-writer');

const db = new sqlite3.Database('./data.db');

const csvWriter = createObjectCsvWriter({
  path: 'data.csv',
  header: [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'contentLength', title: 'Content Length' },
    { id: 'userID', title: 'User ID' },
    { id: 'userName', title: 'User Name' },
    { id: 'editorID', title: 'Editor ID' },
    { id: 'editorName', title: 'Editor Name' },
    { id: 'year', title: 'Year' },
    { id: 'summary', title: 'Summary' },
    { id: 'primaryDiscipline', title: 'Primary Discipline' },
    { id: 'secondaryDiscipline', title: 'Secondary Discipline' },
    { id: 'keyWords', title: 'Key Words' },
    { id: 'readability', title: 'Readability' }
  ]
});

db.all('SELECT * FROM data', [], (err, rows) => {
  if (err) {
    throw err;
  }

  csvWriter.writeRecords(rows)
    .then(() => {
      console.log('CSV file was written successfully');
    })
    .catch(error => {
      console.error('Error writing CSV file', error);
    });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database', err);
  }
});