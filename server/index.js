const express = require('express');
const app = express();
const Drone = require('./drones/drones');
const gatherer = require('./dataGathering/dataGathering');
const parser = require('./utils/xmlParser');
const PORT = 3001;
const DATA_STORAGE_TIME = 600000
let drones = [];

app.get('/', (req, res) => {
  res.send(`Hello there!`)
});

setInterval( async () => {
  const droneDataXml = await gatherer.getDroneData();
  const droneData = await parser.parseXmlToJs(droneDataXml);
  const badDrones = await Drone.filterDrones(droneData);
  drones = Drone.updateDroneList(drones, badDrones);
  console.log('dronelist', drones);
  // drones = Drone.removeExpiredDrones(drones, DATA_STORAGE_TIME)
}, 2000);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});