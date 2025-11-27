const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Создание базы данных
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Создание таблицы пользователей
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  route TEXT NOT NULL
)`);

// Эндпоинт для сохранения данных
app.post('/register', (req, res) => {
  const { name, phone, route } = req.body;
  if (!name || !phone || !route) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  // Проверяем, есть ли уже такой пользователь на этом маршруте
  db.get('SELECT * FROM users WHERE phone = ? AND route = ?', [phone, route], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      // Пользователь уже зарегистрирован
      return res.json({ success: false, error: 'Вы уже зарегистрированы на данном мероприятии' });
    }

    // Если нет, добавляем нового пользователя
    const stmt = db.prepare('INSERT INTO users (name, phone, route) VALUES (?, ?, ?)');
    stmt.run(name, phone, route, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    });
    stmt.finalize();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});