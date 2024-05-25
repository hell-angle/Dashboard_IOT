const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_key"
const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: '1d' });
};

const loginAuth = async (req, res) => {
  const { username, password } = req.body;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'IOT_2'
  });

  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).send({ message: 'Internal server error' });
      return;
    }

    // Query the user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error querying user:', err);
        res.status(500).send({ message: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        const existingUser = results[0];
        const passwordCheck = await bcrypt.compare(password, existingUser.password);

        if (passwordCheck) {
          const token = createToken(existingUser.id);
          res.json({ userData: existingUser,token });
        } else {
          res.status(400).send({ message: 'Wrong Password' });
        }
      } else {
        res.status(400).send({ message: 'User not found' });
      }

      // Close MySQL connection
      connection.end();
    });
  });
};

module.exports = loginAuth;
