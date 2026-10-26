require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
const db = mysql.createPool({
 host: process.env.DB_HOST || 'localhost',
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD || '',
 database: process.env.DB_NAME || 'student_db'
});
app.get('/students', async (req, res) => {
 try {
  const [rows] = await db.execute('SELECT student_id, name FROM students ORDER BY student_id');
  res.json(rows);
 } catch (error) { console.error(error.message); res.status(500).json({error:'Could not load students.'}); }
});
app.post('/students', async (req, res) => {
 const {student_id, name} = req.body || {};
 if (typeof student_id !== 'string' || typeof name !== 'string' || !student_id.trim() || !name.trim() || student_id.trim().length > 20 || name.trim().length > 100) {
  return res.status(400).json({error:'Enter an ID (1-20 characters) and name (1-100 characters).'});
 }
 try {
  await db.execute('INSERT INTO students (student_id, name) VALUES (?, ?)', [student_id.trim(), name.trim()]);
  res.status(201).json({student_id:student_id.trim(),name:name.trim()});
 } catch (error) {
  if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({error:'This student ID already exists.'});
  console.error(error.message); res.status(500).json({error:'Could not save student.'});
 }
});
async function start() {
 try {
  await db.query('SELECT 1');
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`Open http://localhost:${port}`));
 } catch (error) { console.error('MySQL connection failed:',error.message); process.exit(1); }
}
start();
