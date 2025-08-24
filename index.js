const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(express.json());

// CREATE
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(sql, [name, email, age], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User created!', id: result.insertId });
  });
});

// READ
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User updated!' });
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User deleted!' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
