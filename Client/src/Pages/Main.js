import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import Sidebar from "../components/MainHeader/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";
import '../styles/main.css'; // Import CSS file for Main page

const Main = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    light: null
  });
  const [ledState, setLedState] = useState({
    led1: false,
    led2: false
  });

  useEffect(() => {
    // Fetch sensor data
    axios.get('http://localhost:3000/user/datasensorlastest')
      .then(response => {
        const data = response.data;
        const sensorValues = {
          temperature: data.find(item => item.reading_type === 'temperature')?.reading_value,
          humidity: data.find(item => item.reading_type === 'humidity')?.reading_value,
          light: data.find(item => item.reading_type === 'light')?.reading_value
        };
        setSensorData(sensorValues);
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
      });
  }, []);

  const handleLedToggle = (led) => {
    const newState = !ledState[led];
    axios.post(`http://localhost:3000/user/controlled`, { led, state: newState })
      .then(() => {
        setLedState(prevState => ({
          ...prevState,
          [led]: newState
        }));
      })
      .catch(error => {
        console.error(`Error toggling LED ${led}:`, error);
      });
  };

  return (
    <div className="main-page">
      <MainHeader />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h2>Current Sensor Values</h2>
          <div className="sensor-values">
            <p>Temperature: {sensorData.temperature !== null ? `${sensorData.temperature} °C` : 'Loading...'}</p>
            <p>Humidity: {sensorData.humidity !== null ? `${sensorData.humidity} %` : 'Loading...'}</p>
            <p>Light: {sensorData.light !== null ? `${sensorData.light} lux` : 'Loading...'}</p>
          </div>
          <h3>LED Control</h3>
          <div className="led-control">
            <div className="led-switch">
              <label>LED 1</label>
              <Switch
                checked={ledState.led1}
                onChange={() => handleLedToggle('led1')}
              />
            </div>
            <div className="led-switch">
              <label>LED 2</label>
              <Switch
                checked={ledState.led2}
                onChange={() => handleLedToggle('led2')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
