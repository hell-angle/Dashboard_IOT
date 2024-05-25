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

const postTempData = (req, res) => {
    const { sensor_id, reading_type, reading_value } = req.body;

    if (!sensor_id || !reading_type || !reading_value) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'INSERT INTO readings (sensor_id, reading_type, reading_value) VALUES (?, ?, ?)';
    db.query(query, [sensor_id, reading_type, reading_value], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal server error');
        } else {
            res.status(201).send('Data inserted successfully');
        }
    });
};

module.exports = postTempData;
