// SensorGrid.js

import React, { useState, useEffect } from 'react';

const MAX_DIST = 2


const SensorGrid = ({ Arduino_Values_A, Arduino_Values_B }) => {
  const [sensorValues1, setSensorValues1] = useState(Arduino_Values_A);
  const [sensorValues2, setSensorValues2] = useState(Arduino_Values_B);
  const [demoSensorVals, setDemoSensorVals] = useState([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]])

  useEffect(() => {
    setSensorValues1(Arduino_Values_A);
    setSensorValues2(Arduino_Values_B);
    setDemoSensorVals([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]])
  }, [
    Arduino_Values_A,
    Arduino_Values_B,
  ]);


  return (
    <div className="sensor-grid">
      {/* Render the four objects */}

      <div className="sensor-object-label" style={{ left: '18%', bottom: '95%', color: 'white' }}>Sensor 1</div>
      <div className="sensor-object-label" style={{ left: '38%', bottom: '95%', color: 'white' }}>Sensor 2</div>
      <div className="sensor-object-label" style={{ left: '58%', bottom: '95%', color: 'white' }}>Sensor 3</div>
      <div className="sensor-object-label" style={{ left: '78%', bottom: '95%', color: 'white' }}>Sensor 4</div>

      <div className="sensor-object" style={{ left: '20%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '40%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '60%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '80%', bottom: '88%' }}></div>

      <div className="sensor-object-label" style={{ left: '18%', bottom: '90%', color: 'white', hidden: `${sensorValues1[0] == 0 || sensorValues1[0] > MAX_DIST * 100 ? true : false}%` }}>{sensorValues1[0]}</div>
      <div className="sensor-object-label" style={{ left: '38%', bottom: '90%', color: 'white', hidden: `${sensorValues1[1] == 0 || sensorValues1[1] > MAX_DIST * 100 ? true : false}%` }}>{sensorValues1[1]}</div>
      <div className="sensor-object-label" style={{ left: '58%', bottom: '90%', color: 'white', hidden: `${sensorValues2[0] == 0 || sensorValues2[0] > MAX_DIST * 100 ? true : false}%` }}>{sensorValues2[0]}</div>
      {/* <div className="sensor-object-label" style={{ left: '78%', bottom: '90%',  color: 'white'}}>{sensorValues1[3]}</div> */}


      {/* Render floating dots based on sensor data */}
      {demoSensorVals.map((distance, index) => (
        <div
          key={index}
          className="floating-dot"
          style={{ left: `${(index + 1) * 20}%`, top: `${5 + distance / MAX_DIST}%`, hidden: `${distance == 0 || distance > MAX_DIST * 100 ? true : false}%` }}
        ></div>
      ))}
    </div>
  );
};

export default SensorGrid;