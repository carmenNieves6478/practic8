const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // tu usuario de MySQL
    password: '', // tu contraseña de MySQL
    database: 'api_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

// Ruta para obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

// Ruta para agregar un nuevo usuario
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, name, email });
    });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, name, email });
    });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Usuario eliminado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
