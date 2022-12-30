const NO_DRONE_ZONE_RADIUS = 100000;
const CAPTURE_DEVICE_POS_X = 250000;
const CAPTURE_DEVICE_POS_Y = 250000;

const filterDrones = async (data) => {
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

const updateDroneList = (droneList, newDrones) => {
  // if the drone list is empty, return list with new drone
  if (droneList.length == 0) newDrones;
  
  newDrones.forEach(newDrone => {
    droneList = addOrUpdateDroneList(droneList, newDrone);
  })
  return droneList;
}

const addOrUpdateDroneList = (droneList, drone) => {
  const droneIndex = droneList.findIndex(element => element.serialNumber == drone.serialNumber);
  if (droneIndex == -1) return droneList.concat(drone);
    
  const updatedDrone = {...drone, nestDistance: (Math.min(drone.nestDistance, droneList[droneIndex].nestDistance))};
  updatedDrones = droneList.map((drone, i) => i == droneIndex ? updatedDrone : drone)
  return updatedDrones;
}

const removeExpiredDrones = (droneList, expirationDelay) => {
  updatedList = droneList.filter( drone => drone.captureTime >= (Date.now() - expirationDelay));
  return updatedList;
}

// Calculates the distance between two points on a 2d plane
const distance2D = (pos1X, pos1Y, pos2X, pos2Y) => {
  const distX = Math.abs(pos1X - pos2X)
  const distY = Math.abs(pos1Y - pos2Y)
  const dist = Math.sqrt(distX*distX + distY*distY)
  return dist;
};

module.exports = { filterDrones, removeExpiredDrones, updateDroneList }