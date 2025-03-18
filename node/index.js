const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'challenge'
};

const connection = mysql.createConnection(config);
connection.connect(err => {
    if (err) {
        console.error('Error to connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
    const name = getRandomName();
    const add = `INSERT INTO people(name) VALUES(?)`;
    connection.query(add, [name], (err, result) => {
        if (err) {
            console.error('Insert Error:', err);
            return res.status(500).send('<h1>Server Error</h1>');
        }
        console.log('People Added Successfully!');
    });
    const sql = `SELECT * FROM people`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('<h1>Error Server</h1>');
            return;
        }
        let responseHtml = '<h1>Full Cycle Rocks!</h1><ul>';
        results.forEach(person => {
            responseHtml += `<li>${person.id}: ${person.name}</li>`;
        });
        responseHtml += '</ul>';
        res.send(responseHtml);
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log('Running on door ' + port)
});

function getRandomName() {
    const names = ["Fast", "Secret", "Cat", "Smart", "Node", "Magic", "Cry"];
    const name = names[Math.floor(Math.random() * names.length)];
    const index = Math.floor(Math.random() * 1000);
    return `${name}${index}`;
}
