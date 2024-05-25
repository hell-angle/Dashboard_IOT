const express = require('express');
const mysql = require('mysql');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const port = 3000;

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
        console.log('Connected to database');
    }
});

// Function to update device status in the database
const updateDeviceStatus = (deviceId, status) => {
    const query = 'UPDATE devices SET status = ?, updated_at = NOW() WHERE device_id = ?';
    db.query(query, [status, deviceId], (err, results) => {
        if (err) {
            console.error(`Error updating device ${deviceId} status:`, err);
        }
    });
};

// Monitor COM ports
const monitorPort = (portName, deviceId) => {
    const port = new SerialPort({
        path: portName,
        baudRate: 9600
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    port.on('open', () => {
        console.log(`Device ${deviceId} connected on ${portName}`);
        updateDeviceStatus(deviceId, 'active');
    });

    port.on('close', () => {
        console.log(`Device ${deviceId} disconnected from ${portName}`);
        updateDeviceStatus(deviceId, 'inactive');
    });

    port.on('error', (err) => {
        console.error(`Error on port ${portName}:`, err);
    });
};

// Monitor specific ports
monitorPort('COM11', 1);
monitorPort('COM5', 2);


const devideStatus = (req, res) => {
    const query = 'SELECT device_id, device_name, status, updated_at FROM devices';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching device data:', err);
            res.status(500).send('Internal server error');
        } else {
            res.json(results);
        }
    });
};

module.exports = devideStatus;