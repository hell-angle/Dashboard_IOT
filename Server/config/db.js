const mysql = require('mysql');

// MySQL connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'IOT_2'
};

// Create a connection to the MySQL database
const connection = mysql.createConnection(dbConfig);

// Connect to MySQL
connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL successfully!');

});