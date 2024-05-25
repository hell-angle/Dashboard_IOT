import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/MainHeader/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";
import '../styles/logs.css'; // Import CSS file for Logs page
import '../styles/dashboard.css';

const Dashboard = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch the device status from the API using Axios
    axios.get('http://localhost:3000/user/statusdevice')
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    let datePart = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear()
    ].map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0")).join("/");
    let timePart = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ].map((n) => n.toString().padStart(2, "0")).join(":");
    return datePart + " " + timePart;
  };

  return (
    <div className="dashboard-page">
      <MainHeader />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h2>Welcome to the Dashboard of Group 7</h2>
          <p>This is the general overview of the application.</p>
          <h3>Group Information</h3>
          <p>Group Name: Group 7</p>
          <p>Members: Đỗ Công Trình - ID: 20522058</p>
          <p>Members: Lê Trí Khoa - ID: 20521466</p>
          <p>Members: Lê Minh Thông - ID: 20521981</p>
          <h3>Connected Devices</h3>
          <table>
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Status</th>
                <th>Last Connected</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.device_id}>
                  <td>{device.device_name}</td>
                  <td>{device.status}</td>
                  <td>{formatDate(device.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
