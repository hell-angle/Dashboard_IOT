import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto'; // Importing controllers directly from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import Sidebar from '../components/MainHeader/Sidebar';
import MainHeader from '../components/MainHeader/MainHeader';
import '../styles/logs.css'; // Import CSS file for Logs page

const Charts = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [lightData, setLightData] = useState([]);

    useEffect(() => {
        // Fetch temperature data
        axios.get('http://localhost:3000/user/readingtemp')
            .then(response => {
                setTemperatureData(response.data);
            })
            .catch(error => console.error('Error fetching temperature data:', error));

        // Fetch humidity data
        axios.get('http://localhost:3000/user/readinghumid')
            .then(response => {
                setHumidityData(response.data);
            })
            .catch(error => console.error('Error fetching humidity data:', error));

        // Fetch light data
        axios.get('http://localhost:3000/user/readinglight')
            .then(response => {
                setLightData(response.data);
            })
            .catch(error => console.error('Error fetching light data:', error));
    }, []);

    // Prepare data for the chart
    const prepareChartData = (data, label) => {
        const labels = data.map(entry => {
            // Extracting the timestamp from the data
            const timestamp = new Date(entry.reading_timestamp);
            // Formatting the timestamp as needed (e.g., HH:MM:SS)
            return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data.map(entry => entry.reading_value),
                    backgroundColor: label === 'Humidity' ? 'rgba(54, 162, 235, 0.5)' : // Blue color for humidity
                                    'rgba(255, 99, 132, 0.5)', // Red color for temperature and light
                    borderColor: label === 'Humidity' ? 'rgba(54, 162, 235, 1)' : // Blue color for humidity
                                    'rgba(255, 99, 132, 1)', // Red color for temperature and light
                    borderWidth: 1
                }
            ]
        };
    };


    return (
        <div className="logs-page">
            <MainHeader />
            <div className="content">
                <Sidebar />
                <div className="main-content">
                    <h2>Charts Page Content</h2>
                    <div className="chart-container">
                        <Line
                            data={prepareChartData(temperatureData, 'Temperature')}
                            options={{ responsive: true, title: { display: true, text: 'Temperature Readings' } }}
                        />
                        <Bar
                            data={prepareChartData(humidityData, 'Humidity')}
                            options={{ responsive: true, title: { display: true, text: 'Humidity Readings' } }}
                        />
                        <Line
                            data={prepareChartData(lightData, 'Light')}
                            options={{ responsive: true, title: { display: true, text: 'Light Readings' } }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
