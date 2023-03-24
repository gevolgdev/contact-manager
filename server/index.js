const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ricardo20@',
  database: 'contact-schema',
});

app.post('/register', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;
  let SQL = 'INSERT INTO infos (name, email, tel) VALUES ( ?,?,? )';

  db.query(SQL,[name, email, tel], (err, res) => {
    console.log(err)
  });
});

app.get('/getContacts', (req, res) => {
  let SQL = 'SELECT * FROM `contact-schema`.infos';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  });
});

app.listen(3001, () => {
  console.log('Server is running...');
});