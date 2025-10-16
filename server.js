const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/about.html'));
});


app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/contact.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

