// src/components/SensorData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PongGame from './PongGame'; // Import the PongGame component

const SensorData = () => {
    const [sensorValues, setSensorValues] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/');
                setSensorValues(response.data.sensorValues);
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
            <h2>Sensor Data:</h2>
            <ul>
                {Object.entries(sensorValues).map(([uuid, value]) => (
                    <li key={uuid}>
                        {`Characteristic ${uuid}: ${value}`}
                    </li>
                ))}
            </ul>

            {/* Pass the sensor value for Player 1 as a prop */}
            <PongGame
                player1SensorValue={sensorValues["2103"]}
                player2SensorValue={sensorValues["2102"]} // Add this line
            />
        </div>
    );
};

export default SensorData;