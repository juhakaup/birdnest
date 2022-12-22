const parser = require('./xmlParser');

const NO_DRONE_ZONE_RADIUS = 100000;
const CAPTURE_DEVICE_POS_X = 250000;
const CAPTURE_DEVICE_POS_Y = 250000;

const filterDrones = async (xmlData) => {
  const data = await parser.parseDroneData(xmlData)
  const date = new Date(data.report.capture.$.snapshotTimestamp)
  
  let violatingDrones = [];
  data.report.capture.drone.forEach(drone => {
    nestDistance = distance2D(drone.positionX, drone.positionY, CAPTURE_DEVICE_POS_X, CAPTURE_DEVICE_POS_Y);
    if (nestDistance <= NO_DRONE_ZONE_RADIUS) {
      violatingDrones.push({
        serialNumber: drone.serialNumber,
        nestDistance: nestDistance,
        positionX: drone.positionX,
        positionY: drone.positionY,
        captureTime: date,
    });
    }
  })
  return violatingDrones;
};

// Calculates the distance between two points on a 2d plane
const distance2D = (pos1X, pos1Y, pos2X, pos2Y) => {
  const distX = Math.abs(pos1X - pos2X)
  const distY = Math.abs(pos1Y - pos2Y)
  const dist = Math.sqrt(distX*distX + distY*distY)
  return dist;
};

module.exports = { filterDrones }