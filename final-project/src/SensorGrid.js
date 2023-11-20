// SensorGrid.js

import React, {useState, useEffect} from 'react';

const SensorGrid = ({ Arduino_Values_A, Arduino_Values_B }) => {
  const [sensorValues1, setSensorValues1] = useState(Arduino_Values_A);
  const [sensorValues2, setSensorValues2] = useState(Arduino_Values_B);

  useEffect(() => {
    setSensorValues1(Arduino_Values_A);
    setSensorValues2(Arduino_Values_B);
  }, [
        Arduino_Values_A,
        Arduino_Values_B,
    ]);


  return (
    <div className="sensor-grid">
      {/* Render the four objects */}
      <div className="sensor-object" style={{ left: '20%', bottom: '90%' }}></div>
      <div className="sensor-object" style={{ left: '40%', bottom: '90%' }}></div>
      <div className="sensor-object" style={{ left: '60%', bottom: '90%' }}></div>
      <div className="sensor-object" style={{ left: '80%', bottom: '90%' }}></div>

      {/* Render floating dots based on sensor data */}
      {sensorValues1.map((distance, index) => (
        <div
          key={index}
          className="floating-dot"
          style={{ left: `${(index+1) * 20}%`, bottom: `${distance/4}%` }}
        ></div>
      ))}
    </div>
  );
};

export default SensorGrid;