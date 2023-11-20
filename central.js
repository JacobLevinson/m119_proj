// based on the example on https://www.npmjs.com/package/@abandonware/noble

// import Pong from 'react-pong'

const noble = require('@abandonware/noble');

const uuid_service = "1101"
const uuid_values = ["2101", "2102", "2103"]; // Array of UUIDs

let sensorValues = {};

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning");
        await noble.startScanningAsync([uuid_service], false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], uuid_values);

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
    const uuid = characteristic.uuid;
    sensorValues[uuid] = value.readFloatLE(0);
    console.log(`Characteristic ${uuid}: ${sensorValues[uuid]}`);

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
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        sensorValue: sensorValue
    }))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
