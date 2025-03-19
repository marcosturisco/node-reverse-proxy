const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql2');
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

app.get('/add', (req, res) => {
    const name = getRandomName();
    const add = `INSERT INTO people(name) VALUES(?)`;
    connection.query(add, [name], (err, result) => {
        if (err) {
            console.error('Insert Error:', err);
            return res.status(500).send('<h1>Server Error</h1>');
        }
        console.log(`${name} Added Successfully!`);
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

app.use((req, res, next) => {
  console.log(`Request of: ${req.ip} to ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
    console.log('Testing APP Service');
    res.send('<h1>Testing APP Service</h1>');
});

app.listen(port, () => {
    console.log('Running on door ' + port)
});

function getRandomName() {
    const names = [
      "Alexander the Great",
      "Julius Caesar",
      "Cleopatra VII",
      "Leonidas I",
      "Hannibal Barca",
      "King Arthur",
      "Joan of Arc",
      "Genghis Khan",
      "Richard the Lionheart",
      "Robin Hood",
      "Leonardo da Vinci",
      "Michelangelo",
      "William Shakespeare",
      "Galileo Galilei",
      "Napoleon Bonaparte",
      "Abraham Lincoln",
      "Nikola Tesla",
      "Winston Churchill",
      "Mahatma Gandhi",
      "Martin Luther King Jr."
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    return `${name}`;
}
