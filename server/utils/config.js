require('dotenv').config();
const PORT = process.env.PORT || 3001;
const DATA_STORAGE_TIME = 600000;
const NO_DRONE_ZONE_RADIUS = 100000;
const ZONE_CENTER_X = 250000;
const ZONE_CENTER_Y = 250000;


module.exports = { 
  PORT, 
  DATA_STORAGE_TIME,
  NO_DRONE_ZONE_RADIUS,
  ZONE_CENTER_X,
  ZONE_CENTER_Y
}