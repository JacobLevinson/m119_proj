const noble = require('@abandonware/noble');

const uuid_services = ["1101", "1102"]; // Array of service UUIDs
const uuid_values = ["2101", "2102", "2103"]; // Array of UUIDs

let sensorValues1 = {};
let sensorValues2 = {};

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning");
        await noble.startScanningAsync(uuid_services, false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(uuid_services, uuid_values);

    // Read data for each characteristic
    characteristics.forEach((characteristic) => {
        readData(characteristic);
    });
});

//
// read data periodically
//
let readData = async (characteristic) => {
    const value = (await characteristic.readAsync());
    const serviceUuid = characteristic._serviceUuid;
    const uuid = characteristic.uuid;

    if (serviceUuid === '1101') {
        sensorValues1[uuid] = value.readFloatLE(0);
        console.log(`Characteristic ${uuid} from Service 1101: ${sensorValues1[uuid]}`);
    } else if (serviceUuid === '1102') {
        sensorValues2[uuid] = value.readFloatLE(0);
        console.log(`Characteristic ${uuid} from Service 1102: ${sensorValues2[uuid]}`);
    }

    // read data again in t milliseconds
    setTimeout(() => {
        readData(characteristic);
    }, 10);
}

//
// hosting a web-based front-end and respond requests with sensor data
// based on example code on https://expressjs.com/
//
const express = require('express')
const cors = require('cors'); // Import the 'cors' middleware

const app = express();

app.use(cors()); // Enable CORS for all routes
const port = 3000

// Specify the directory where your EJS templates are located (the "views" directory).
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        sensorValues1: sensorValues1,
        sensorValues2: sensorValues2
    }))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})