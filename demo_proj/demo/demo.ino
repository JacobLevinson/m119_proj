#include <ArduinoBLE.h>
#include <Arduino_LSM6DS3.h>

#define BLE_UUID_ULTRASONIC_SERVICE "1101"
#define BLE_UUID_ULTRASONIC_1 "2101"
#define BLE_UUID_ACCELEROMETER_Y "2102"
#define BLE_UUID_ACCELEROMETER_Z "2103"

#define BLE_DEVICE_NAME "Elfo"
#define BLE_LOCAL_NAME "Elfo"

BLEService ultrasonicService(BLE_UUID_ULTRASONIC_SERVICE);

BLEFloatCharacteristic ultrasonicCharacteristic1(BLE_UUID_ULTRASONIC_1, BLERead | BLENotify);
BLEFloatCharacteristic accelerometerCharacteristicY(BLE_UUID_ACCELEROMETER_Y, BLERead | BLENotify);
BLEFloatCharacteristic accelerometerCharacteristicZ(BLE_UUID_ACCELEROMETER_Z, BLERead | BLENotify);

float x, y, z;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);


  // initialize BLE
  if (!BLE.begin()) {
    Serial.println("Starting Bluetooth® Low Energy module failed!");
    while (1)
      ;
  }

  // set advertised local name and service UUID
  BLE.setDeviceName(BLE_DEVICE_NAME);
  BLE.setLocalName(BLE_LOCAL_NAME);
  BLE.setAdvertisedService(ultrasonicService);

  ultrasonicService.addCharacteristic(ultrasonicCharacteristic1);
  ultrasonicService.addCharacteristic(accelerometerCharacteristicY);
  ultrasonicService.addCharacteristic(accelerometerCharacteristicZ);

  BLE.addService(ultrasonicService);

  ultrasonicCharacteristic1.writeValue(0);
  accelerometerCharacteristicY.writeValue(0);
  accelerometerCharacteristicZ.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE Accelerometer Peripheral");
}

void loop() {
  BLEDevice central = BLE.central();

    ultrasonicCharacteristic1.writeValue(x);
    accelerometerCharacteristicY.writeValue(y);
    accelerometerCharacteristicZ.writeValue(z);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }
}
