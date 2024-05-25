const express = require('express');
const mysql = require('mysql');
const app = express();


// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // replace with your database user
    password: '',      // replace with your database password
    database: 'IOT_2'  // replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        
    }
});

const turnOnLed2 = (req, res) => {
    const query = 'UPDATE led_control SET led_state = 1 WHERE device_id = 2;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching light data:', err);
            res.status(500).send('Internal server error');
        } else {
            res.send('update successfully');
        }
    });
};

module.exports = turnOnLed2;
