const config = require('./config')
const url = config.DRONE_URL;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let drones = [];
const parser = require('./xmlParser');
const drone = require('./drones');

// Fetching drone data every 2 seconds and processing it
const gatherData = () => {
  setInterval( async () => {
    try {
      const result = await (await fetch(url, {method: 'GET'})).text();
      const droneData = await parser.parseXmlToJs(result);
      const badDrones = drone.getDronesInRange(droneData, config.ZONE_CENTER_X, config.ZONE_CENTER_Y, config.NO_DRONE_ZONE_RADIUS);
      drones = drone.updateDroneList(drones, badDrones);
      drones = drone.removeExpiredDrones(drones, config.DATA_STORAGE_TIME);
      // console.log(drones)
    } catch (error) {
      console.error(error);
    }
    
  }, 2000);
}

const getDrones = () => drones;

module.exports = { gatherData, getDrones };