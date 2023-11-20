// src/components/SensorData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SensorGrid from './SensorGrid'; // Import the PongGame component

const SensorData = () => {
    const [sensorValues1, setSensorValues1] = useState([1, 2, 3, 4]);
    const [sensorValues2, setSensorValues2] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/');

                setSensorValues1(response.data.sensorValues1);
                setSensorValues2(response.data.sensorValues2);

            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 100); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* <h2>Sensor Data:</h2>
            <ul>
                {Object.entries(sensorValues1).map(([uuid, value]) => (
                    <li key={uuid}>
                        {`Characteristic ${uuid}: ${value}`}
                    </li>
                ))}
            </ul> */}

            {/* Pass the sensor value for Player 1 as a prop */}
            <SensorGrid
                Arduino_Values_A={[sensorValues1["2101"], sensorValues1["2102"], sensorValues1["2103"], sensorValues1["2104"]]}
                Arduino_Values_B={[sensorValues2["2101"], sensorValues2["2102"], sensorValues2["2103"], sensorValues2["2104"]]}
            />
        </div>
    );
};

export default SensorData;