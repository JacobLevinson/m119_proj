// import logo from './logo.svg';
import './App.css';

import SensorData from './SensorData';
import backgroundImage from './map of the room.png';

function App() {
  return (
    // set the background image to   background-image: '/media/map of the room.png';
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
    {/* <div className="App"> */}
      {/* <h1>Final Project</h1> */}
      <SensorData/>
    </div>
  );
}

export default App;
