const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'NuCleuS1503', // Replace with your MySQL password
  database: 'crud_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = db;
