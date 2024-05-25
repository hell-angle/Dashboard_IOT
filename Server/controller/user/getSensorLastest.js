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

const getLastestData = (req, res) => {
    const query = `SELECT r1.reading_type, r1.reading_value, r1.reading_timestamp
    FROM readings r1
    INNER JOIN (
        SELECT reading_type, MAX(reading_timestamp) AS max_timestamp
        FROM readings
        GROUP BY reading_type
    ) r2 ON r1.reading_type = r2.reading_type AND r1.reading_timestamp = r2.max_timestamp;`
        
    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching sensor data:', err);
            res.status(500).send('Internal server error');
        } else {
            res.json(data);
        }
    });
};

module.exports = getLastestData;
