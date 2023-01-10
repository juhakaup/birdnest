require('dotenv').config();
const PORT = process.env.PORT || 8080;
const DATA_STORAGE_TIME = 600000;
const NO_DRONE_ZONE_RADIUS = 100000;
const ZONE_CENTER_X = 250000;
const ZONE_CENTER_Y = 250000;
const PILOT_URL = 'https://assignments.reaktor.com/birdnest/pilots/';
const DRONE_URL = 'https://assignments.reaktor.com/birdnest/drones';


module.exports = { 
  PORT, 
  DATA_STORAGE_TIME,
  NO_DRONE_ZONE_RADIUS,
  ZONE_CENTER_X,
  ZONE_CENTER_Y,
  PILOT_URL,
  DRONE_URL
}