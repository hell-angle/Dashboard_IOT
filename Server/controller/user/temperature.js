const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // replace with your database host
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

const getTemperatureData = (req, res) => {
    const query = 'SELECT * FROM readings WHERE reading_type = "temperature"';
    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching temperature data:', err);
            res.status(500).send('Internal server error');
        } else {
            res.json(data);
        }
    });
};

module.exports = getTemperatureData;
