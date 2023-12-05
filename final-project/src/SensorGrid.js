import React, { useState, useEffect } from 'react';
import backgroundImage from './map of the room.png'; // adjust the path as needed

const MAX_DIST = 3;

const SensorGrid = ({ Arduino_Values_A, Arduino_Values_B }) => {
  const [sensorValues1, setSensorValues1] = useState(Arduino_Values_A);
  const [sensorValues2, setSensorValues2] = useState(Arduino_Values_B);
  const [demoSensorVals, setDemoSensorVals] = useState([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]]);

  useEffect(() => {
    setSensorValues1(Arduino_Values_A);
    setSensorValues2(Arduino_Values_B);



    setDemoSensorVals([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]]);
  }, [
    Arduino_Values_A,
    Arduino_Values_B,
  ]);

  return (
    <div className="sensor-grid">
      {/* Render the foreground image */}
      <img src={backgroundImage} alt="Foreground Image" className="foreground-image" style={{ width: '1200px', height: 'auto', top: '0px' }} />
      {/* Render the four objects */}


      {/* HORIZONTAL TABLES */}
      <div className="sensor-object-label" style={{ left: '41%', bottom: '102%', color: 'white' }}>Sensor 1:</div>
      <div className="sensor-object-label" style={{ left: '51%', bottom: '102%', color: 'white' }}>Sensor 2:</div>
      <div className="sensor-object-label" style={{ left: '61%', bottom: '102%', color: 'white' }}>Sensor 3:</div>
      <div className="sensor-object-label" style={{ left: '71%', bottom: '102%', color: 'white' }}>Sensor 4:</div>

      <div className="sensor-object" style={{ left: '43%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '53%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '63%', bottom: '88%' }}></div>
      <div className="sensor-object" style={{ left: '73%', bottom: '88%' }}></div>

      {sensorValues1[0] !== 0 && sensorValues1[0] !== MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '42%', bottom: '93%', color: 'white' }}>
          {sensorValues1[0]} cm
        </div>
      )}
      {sensorValues1[1] !== 0 && sensorValues1[1] !== MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '52%', bottom: '93%', color: 'white' }}>
          {sensorValues1[1]} cm
        </div>
      )}
      {sensorValues1[2] !== 0 && sensorValues1[2] !== MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '62%', bottom: '93%', color: 'white' }}>
          {sensorValues1[2]} cm
        </div>
      )}
      {sensorValues1[3] !== 0 && sensorValues1[3] !== MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '72%', bottom: '93%', color: 'white' }}>
          {sensorValues1[3]} cm
        </div>
      )}

      {/* VERTICAL TABLES */}
      <div className="sensor-object-label" style={{ left: '12%', bottom: '13%', color: 'white' }}>Sensor 5:</div>
      <div className="sensor-object-label" style={{ left: '12%', bottom: '33%', color: 'white' }}>Sensor 6:</div>
      <div className="sensor-object-label" style={{ left: '12%', bottom: '53%', color: 'white' }}>Sensor 7:</div>
      <div className="sensor-object-label" style={{ left: '12%', bottom: '73%', color: 'white' }}>Sensor 8:</div>

      <div className="sensor-object-vert" style={{ left: '25.75%', bottom: '10%' }}></div>
      <div className="sensor-object-vert" style={{ left: '25.75%', bottom: '30%' }}></div>
      <div className="sensor-object-vert" style={{ left: '25.75%', bottom: '50%' }}></div>
      <div className="sensor-object-vert" style={{ left: '25.75%', bottom: '70%' }}></div>

      {sensorValues2[0] !== 0 && sensorValues2[0] !== MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '9%', color: 'white' }}>{sensorValues2[0]} cm</div>)}
      {sensorValues2[1] !== 0 && sensorValues2[1] !== MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '29%', color: 'white' }}>{sensorValues2[1]} cm</div>)}
      {sensorValues2[2] !== 0 && sensorValues2[2] !== MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '49%', color: 'white' }}>{sensorValues2[2]} cm</div>)}
      {sensorValues2[3] !== 0 && sensorValues2[3] !== MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '69%', color: 'white' }}>{sensorValues2[3]} cm</div>)}

      {/* Render floating dots based on sensor data */}
      {sensorValues1.map((distance, index) => (
        <div
          key={index}
          className="floating-dot"
          style={{ left: `${33 + (index + 1) * 10}%`, top: `${10 + (distance / MAX_DIST) / 6}%`, hidden: `${distance === 0 || distance >= MAX_DIST * 100 ? true : false}%` }}
        ></div>
      ))}
      {sensorValues2.map((distance, index) => (
        <div
          key={index}
          className="floating-dot"
          style={{ bottom: `${-7 + (index + 1) * 20}%`, left: `${25 + (distance / MAX_DIST) / 7.5}%`, hidden: `${distance === 0 || distance >= MAX_DIST * 100 ? true : false}%` }}
        ></div>
      ))}
    </div>
  );
};

export default SensorGrid;