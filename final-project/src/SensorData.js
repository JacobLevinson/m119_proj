// src/components/SensorData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SensorGrid from './SensorGrid'; // Import the PongGame component

const SensorData = () => {
    const [sensorValues1, setSensorValues1] = useState({
        "2101": 1,
        "2102": 2,
        "2103": 3,
        "2104": 4
    });
    const [sensorValues2, setSensorValues2] = useState({
        "2101": 5,
        "2102": 6,
        "2103": 7,
        "2104": 8
    });

    // useEffect(() => {

        // TESTING FROM HERE ///
        // const fetchData_1 = () => {
        //     // Simulate changing sensor values
        //     setSensorValues1(prevValues => ({
        //         "2101": getRandomValue(prevValues["2101"]),
        //         "2102": getRandomValue(prevValues["2102"]),
        //         "2103": getRandomValue(prevValues["2103"]),
        //         "2104": getRandomValue(prevValues["2104"])
        //     }));
        // };

        // const fetchData_2 = () => {
        //     // Simulate changing sensor values

        //     setSensorValues2(prevValues => ({
        //         "2101": getRandomValue(prevValues["2101"]),
        //         "2102": getRandomValue(prevValues["2102"]),
        //         "2103": getRandomValue(prevValues["2103"]),
        //         "2104": getRandomValue(prevValues["2104"])
        //     }));
        // };

        // const getRandomValue = (prevValue) => {
        //     const min = prevValue - 10;
        //     const max = prevValue + 10;
        //     var value = Math.random() * (max - min) + min;
        //     // return 0
        //     if (value < 0) return 0;
        //     else if (value > 300) return 300;
        //     else return Math.round(value)
        // };

        // END TESTING //

        // PRODUCTION //
    useEffect(() => {
        const fetchData_1 = async () => {
            try {
                const response = await axios.post('http://localhost:3500/');
                var values = response.data.sensorValues;
                for (let i = 0; i < values; i++) {
                    if (values[i] < 0 ) values[i] = 0
                    else if (values[i] > 300) values[i] = 300
                }
                setSensorValues1(values);
            } catch (error) {
                console.error('Error fetching sensor data 1:', error);
            }
        };
    
        const fetchData_2 = async () => {
            try {
                const response = await axios.post('http://localhost:3501/');
                var values = response.data.sensorValues;
                for (let i = 0; i < values; i++) {
                    if (values[i] < 0 ) values[i] = 0
                    else if (values[i] > 300) values[i] = 300
                }
                setSensorValues1(values);
            } catch (error) {
                console.error('Error fetching sensor data 2:', error);
            }
        };
    
        const interval_1 = setInterval(fetchData_1, 150);
        const interval_2 = setInterval(fetchData_2, 150);
    

        // Clear intervals when the component unmounts or when you no longer need them
        return () => {
            clearInterval(interval_1);
            clearInterval(interval_2);
        };

    }, []); 


    return (
        <div>
            <h1 style={{ color: 'Black' }}>Sensor Data</h1>

            <SensorGrid
                Arduino_Values_A={[sensorValues1["2101"], sensorValues1["2102"], sensorValues1["2103"], sensorValues1["2104"]]}
                Arduino_Values_B={[sensorValues2["2101"], sensorValues2["2102"], sensorValues2["2103"], sensorValues2["2104"]]}
            />
        </div>
    );
};

export default SensorData;