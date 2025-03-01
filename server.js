const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const e = require('express');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data'
});


app.post('/signup', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND `password` = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ error: err });
        }
        if (data.length > 0) {
            return res.json(success);
        } else {
            return res.json(failS);
        }
    });
      
})



app.post('/login', (req, res) => {
    const sql = 'INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)';
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json({ error: err });
        }
        return res.json(data);
    });
      
})


app.listen(8081, () => {
    console.log('Server running on port 8081');
});