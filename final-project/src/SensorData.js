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

    useEffect(() => {

        // TESTING FROM HERE ///
        // const fetchData = () => {
        //     // Simulate changing sensor values
        //     setSensorValues1(prevValues => ({
        //         "2101": getRandomValue(prevValues["2101"]),
        //         "2102": getRandomValue(prevValues["2102"]),
        //         "2103": getRandomValue(prevValues["2103"]),
        //         "2104": getRandomValue(prevValues["2104"])
        //     }));

        //     setSensorValues2(prevValues => ({
        //         "2101": getRandomValue(prevValues["2101"]),
        //         "2102": getRandomValue(prevValues["2102"]),
        //         "2103": getRandomValue(prevValues["2103"]),
        //         "2104": getRandomValue(prevValues["2104"])
        //     }));
        // };

        // const getRandomValue = (prevValue) => {
        //     const min = prevValue - 1;
        //     const max = prevValue + 1;
        //     return Math.random() * (max - min) + min;
        // };

        // END TESTING //

        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3500/');

                setSensorValues1(response.data.sensorValues);
                // setSensorValues2(response.data.sensorValues);

                response = await axios.post('http://localhost:3501/');

                // setSensorValues1(response.data.sensorValues1);
                setSensorValues2(response.data.sensorValues);


            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };



        // const fetchData_2 = async () => {
        //     try {
        //         const response = await axios.post('http://localhost:3501/');

        //         setSensorValues1(response.data.sensorValues1);
        //         setSensorValues2(response.data.sensorValues2);

        //     } catch (error) {
        //         console.error('Error fetching sensor data:', error);
        //     }
        // };

        fetchData();
        // fetchDatae_2
        const interval = setInterval(fetchData, 100); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <SensorGrid
                Arduino_Values_A={[sensorValues1["2101"], sensorValues1["2102"], sensorValues1["2103"], sensorValues1["2104"]]}
                Arduino_Values_B={[sensorValues2["2101"], sensorValues2["2102"], sensorValues2["2103"], sensorValues2["2104"]]}
            />
        </div>
    );
};

export default SensorData;