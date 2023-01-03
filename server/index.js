const express = require('express');
const app = express();
const Drone = require('./drones/drones');
const gatherer = require('./dataGathering/dataGathering');
const parser = require('./utils/xmlParser');
const config = require('./utils/config');
const cors = require('cors')

let drones = [];
app.use(cors())

// Routes
const droneRoutes = require('./routes/drones');
app.use('/api/drones', droneRoutes.router);

// Fetching drone data every 2 seconds and processing it
setInterval( async () => {
  const droneDataXml = await gatherer.getDroneData();
  const droneData = await parser.parseXmlToJs(droneDataXml);
  const badDrones = await Drone.getDronesInRange(droneData, config.ZONE_CENTER_X, config.ZONE_CENTER_Y, config.NO_DRONE_ZONE_RADIUS);
  drones = Drone.updateDroneList(drones, badDrones);
  drones = Drone.removeExpiredDrones(drones, config.DATA_STORAGE_TIME)
  droneRoutes.updateDroneData(drones)
  console.log(drones)
}, 2000);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});