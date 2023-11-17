#include <ArduinoBLE.h>

#define BLE_UUID_ULTRASONIC_SERVICE "1101"
#define BLE_UUID_ULTRASONIC_1 "2101"
#define BLE_UUID_ULTRASONIC_2 "2102"
#define BLE_UUID_ULTRASONIC_3 "2103"
#define BLE_UUID_ULTRASONIC_4 "2104"


#define BLE_DEVICE_NAME "Jacob"
#define BLE_LOCAL_NAME "Jacob"


const int trigPins[4] = {2, 3, 4, 5};
const int echoPins[4] = {6, 7, 8, 9};

long durations[4];
int distances[4];

BLEService ultrasonicService(BLE_UUID_ULTRASONIC_SERVICE);

BLEIntCharacteristic ultrasonicCharacteristic1(BLE_UUID_ULTRASONIC_1, BLERead | BLENotify);
BLEIntCharacteristic ultrasonicCharacteristic2(BLE_UUID_ULTRASONIC_2, BLERead | BLENotify);
BLEIntCharacteristic ultrasonicCharacteristic3(BLE_UUID_ULTRASONIC_3, BLERead | BLENotify);
BLEIntCharacteristic ultrasonicCharacteristic4(BLE_UUID_ULTRASONIC_4, BLERead | BLENotify);

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  for(int i = 0; i < 4; i++){
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
  }
  // initialize BLE
  if (!BLE.begin()) {
    Serial.println("Starting Bluetooth® Low Energy module failed!");
    while (1);
  }

  // set advertised local name and service UUID
  BLE.setDeviceName(BLE_DEVICE_NAME);
  BLE.setLocalName(BLE_LOCAL_NAME);
  BLE.setAdvertisedService(ultrasonicService);

  ultrasonicService.addCharacteristic(ultrasonicCharacteristic1);
  ultrasonicService.addCharacteristic(ultrasonicCharacteristic2);
  ultrasonicService.addCharacteristic(ultrasonicCharacteristic3);
  ultrasonicService.addCharacteristic(ultrasonicCharacteristic4);
  
  BLE.addService(ultrasonicService);

  ultrasonicCharacteristic1.writeValue(0);
  ultrasonicCharacteristic2.writeValue(0);
  ultrasonicCharacteristic3.writeValue(0); 
  ultrasonicCharacteristic4.writeValue(0);     
  // start advertising
  BLE.advertise();

  Serial.println("BLE Ultrasonic Peripheral");
}

void loop() {
  BLEDevice central = BLE.central();
  for(int i = 0; i < 4; i++){
    digitalWrite(trigPins[i], LOW);
    delayMicroseconds(2);
    
    // Send a 10 microsecond pulse to the trigger pin
    digitalWrite(trigPins[i], HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPins[i], LOW);
    
    // Read the duration of the pulse from the echo pin
    durations[i] = pulseIn(echoPins[i], HIGH);
    
    // Calculate the distance in centimeters
    distances[i] = durations[i] * 0.034 / 2;
    
    // Print the distance to the serial monitor
    Serial.print("Distance ");
    Serial.print(i);
    Serial.print(": ");
    
    Serial.print(distances[i]);
    Serial.println(" cm");
    
    // Wait for a short time before taking the next measurement
    delay(100);
  }

    ultrasonicCharacteristic1.writeValue(distances[0]);
    ultrasonicCharacteristic2.writeValue(distances[1]);
    ultrasonicCharacteristic3.writeValue(distances[2]);
    ultrasonicCharacteristic4.writeValue(distances[3]);
}
