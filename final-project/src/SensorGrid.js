import React, { useState, useEffect } from 'react';
import backgroundImage from './map of the room.png'; // adjust the path as needed

const MAX_DIST = 3;
const MAX_HIST = 100;

const SensorGrid = ({ Arduino_Values_A, Arduino_Values_B }) => {
  const [sensorValues1, setSensorValues1] = useState(Arduino_Values_A);
  const [sensorValues2, setSensorValues2] = useState(Arduino_Values_B);
  const [demoSensorVals, setDemoSensorVals] = useState([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]]);
  const [sensorValues1History, setSensorValues1History] = useState([Array(4).fill(0)]);
  const [sensorValues2History, setSensorValues2History] = useState([Array(4).fill(0)]);
  const [sensorValues1HistCount, setSensorValues1HistCount] = useState([0, 0, 0, 0]);
  const [sensorValues2HistCount, setSensorValues2HistCount] = useState([0, 0, 0, 0]);
  
  useEffect(() => {
    console.log(sensorValues1History);
  }, [sensorValues1History]);


  useEffect(() => {
    setSensorValues1((prevValues) => {
      const newValues = Arduino_Values_A;
  
      // var updatedValues = 

      const updatedValues = [...sensorValues1History, newValues].slice(-MAX_HIST); // Keep only the last 100 readings
      setSensorValues1History(updatedValues);
      // console.log(sensorValues1History)
      // Calculate sensorValues1HistCount
      const histCount = Array(4).fill(0);

      updatedValues.forEach((row) => {
        if (Array.isArray(row)) {
          row.forEach((value, columnIndex) => {
            if (value > 0 && value <= MAX_DIST * 100) {
              histCount[columnIndex]++;
            }
          });
        }
      });
  
      setSensorValues1HistCount(histCount);
  
      return newValues;
    });
  
    setSensorValues2((prevValues) => {
      const newValues = Arduino_Values_B;
      const updatedValues = [...sensorValues2History, newValues].slice(-MAX_HIST); // Keep only the last 100 readings
      setSensorValues2History(updatedValues);


      const histCount = Array(4).fill(0);

 
      updatedValues.forEach((row) => {
        if (Array.isArray(row)) {
          row.forEach((value, columnIndex) => {
            if (value > 0 && value <= MAX_DIST * 100) {
              histCount[columnIndex]++;
            }
          });
        }
      });
  
      setSensorValues2HistCount(histCount);
  


      return newValues;
    });


    // setDemoSensorVals([Arduino_Values_A[0], Arduino_Values_A[1], Arduino_Values_B[0]]);
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

      {sensorValues1HistCount.map((count, index) => (
        <div
          key={index}
          className="sensor-object-heatmap"
          style={{
            left: `${43 + index * 10}%`,
            bottom: '63%',
            opacity: count / MAX_HIST, // Set opacity dynamically
          }}
        ></div>
      ))}

{sensorValues2HistCount.map((count, index) => (
        <div
          key={index}
          className="sensor-object-heatmap-vert"
          style={{
            bottom: `${-5 + 20*index}%`,
            left: '32%',
            opacity: count / MAX_HIST, // Set opacity dynamically
          }}
        ></div>
      ))}



      {/* <div style={{ left: '10%', bottom: '90%', color: 'white'}} >{sensorValues1HistCount[0]}</div> */}


      {sensorValues1[0] !== 0 && sensorValues1[0] <= MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '42%', bottom: '93%', color: 'white' }}>
          {sensorValues1[0]} cm
         
        </div>
      )}
      {sensorValues1[1] !== 0 && sensorValues1[1] <= MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '52%', bottom: '93%', color: 'white' }}>
          {sensorValues1[1]} cm
        </div>
      )}
      {sensorValues1[2] !== 0 && sensorValues1[2] <= MAX_DIST * 100 && (
        <div className="sensor-object-label" style={{ left: '62%', bottom: '93%', color: 'white' }}>
          {sensorValues1[2]} cm
        </div>
      )}
      {sensorValues1[3] !== 0 && sensorValues1[3] <= MAX_DIST * 100 && (
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

      {sensorValues2[0] !== 0 && sensorValues2[0] <= MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '9%', color: 'white' }}>{sensorValues2[0]} cm</div>)}
      {sensorValues2[1] !== 0 && sensorValues2[1] <= MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '29%', color: 'white' }}>{sensorValues2[1]} cm</div>)}
      {sensorValues2[2] !== 0 && sensorValues2[2] <= MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '49%', color: 'white' }}>{sensorValues2[2]} cm</div>)}
      {sensorValues2[3] !== 0 && sensorValues2[3] <= MAX_DIST * 100 && (<div className="sensor-object-label" style={{ left: '14%', bottom: '69%', color: 'white' }}>{sensorValues2[3]} cm</div>)}

      {/* Render floating dots based on sensor data */}
      {sensorValues1
        .map((distance, originalIndex) => ({ distance, originalIndex }))
        .filter(({ distance }) => distance > 0 && distance <= 300)
        .map(({ distance, originalIndex }) => (
          <div
            key={originalIndex}
            className="floating-dot"
            style={{ left: `${33 + (originalIndex + 1) * 10}%`, top: `${10 + (distance / MAX_DIST) / 6}%` }}
          ></div>
        ))}

      {sensorValues2
        .map((distance, originalIndex) => ({ distance, originalIndex }))
        .filter(({ distance }) => (distance > 0) && distance <= 300)
        .map(({ distance, originalIndex }) => (
        <div
          key={originalIndex}
          className="floating-dot"
          style={{ bottom: `${-7 + (originalIndex + 1) * 20}%`, left: `${25 + (distance / MAX_DIST) / 7.5}%` }}
        ></div>
      ))}
    </div>
  );
};

export default SensorGrid;