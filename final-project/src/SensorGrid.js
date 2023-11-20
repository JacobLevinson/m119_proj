// SensorGrid.js

import React, {useState, useEffect} from 'react';

const MAX_DIST = 4


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

      <div className="sensor-object-label" style={{ left: '18%', bottom: '95%',  color: 'white'}}>Sensor 1</div>
      <div className="sensor-object-label" style={{ left: '38%', bottom: '95%',  color: 'white'}}>Sensor 2</div>
      <div className="sensor-object-label" style={{ left: '58%', bottom: '95%',  color: 'white'}}>Sensor 3</div>
      <div className="sensor-object-label" style={{ left: '78%', bottom: '95%',  color: 'white'}}>Sensor 4</div>

      <div className="sensor-object" style={{ left: '20%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '40%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '60%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '80%', bottom: '88%' }}></div>

      <div className="sensor-object-label" style={{ left: '18%', bottom: '90%',  color: 'white'}}>{sensorValues1[0]}</div>
      <div className="sensor-object-label" style={{ left: '38%', bottom: '90%',  color: 'white'}}>{sensorValues1[1]}</div>
      <div className="sensor-object-label" style={{ left: '58%', bottom: '90%',  color: 'white'}}>{sensorValues1[2]}</div>      
      <div className="sensor-object-label" style={{ left: '78%', bottom: '90%',  color: 'white'}}>{sensorValues1[3]}</div>


      {/* Render floating dots based on sensor data */}
      {sensorValues1.map((distance, index) => (
        <div
          key={index}
          className="floating-dot"
          style={{ left: `${(index+1) * 20}%`, bottom: `${distance/MAX_DIST}%` }}
        ></div>
      ))}
    </div>
  );
};

export default SensorGrid;