const drones = require('../utils/drones')

serverTestData = 
{
  report: {
    deviceInformation: {
      '$': "GUARDB1RD",
      listenRange: '500000',
      deviceStarted: '2022-12-30T01:01:56.966Z',
      uptimeSeconds: '40652',
      updateIntervalMs: '2000'
    },
    capture: {
      '$': { snapshotTimestamp: '2022-12-30T12:21:27.332Z' },
      drone: [
        {
          serialNumber: 'SN-testdroneone',
          model: 'Altitude X',
          manufacturer: 'DroneGoat Inc',
          mac: 'a5:af:9c:26:40:62',
          ipv4: '59.52.23.54',
          ipv6: 'e739:5273:ab03:11c4:5520:aded:ca0a:4db4',
          firmware: '7.1.1',
          positionY: '400000.0',
          positionX: '300000.0',
          altitude: '4848.726846407445'
        },
        {
          serialNumber: 'SN-testdronetwo',
          model: 'HRP-DRP 1',
          manufacturer: 'ProDröne Ltd',
          mac: 'b5:75:03:dd:d0:d1',
          ipv4: '191.194.155.1',
          ipv6: '220e:de6b:c95e:4745:3c90:f9dc:a61f:8385',
          firmware: '5.4.3',
          positionY: '250000.0',
          positionX: '250000.0',
          altitude: '4264.283030546847'
        },
        {
          serialNumber: 'SN-oEeTFMCenv',
          model: 'HRP-DRP 1 Pro',
          manufacturer: 'ProDröne Ltd',
          mac: 'a7:0e:b9:6e:8e:e4',
          ipv4: '121.185.105.125',
          ipv6: 'aa2d:ac79:a323:8e7c:0191:e926:941e:4293',
          firmware: '0.8.0',
          positionY: '497090.1236601316',
          positionX: '319202.9583654682',
          altitude: '4746.174686292552'
        }
      ]
    }
  }
};

droneList = []

newDrone = {
    serialNumber: 'SN-newDrone',
    nestDistance: 50000,
    positionX: '220000.0',
    positionY: '210000.0',
    captureTime: '2022-12-30T12:21:27.332Z'
  }

newDroneUpdated = {
  serialNumber: 'SN-newDrone',
  nestDistance: 0,
  positionX: '250000.0',
  positionY: '250000.0',
  captureTime: '2022-12-30T12:21:27.332Z'
}


describe('Drone service', () => {
  describe('Filtering drone data', () => {
    it('should return drone that is within range', async () => {
      const result = await drones.getDronesInRange(serverTestData, 250000, 250000, 100000);
      expect(result.length).toBe(1);
      expect(result[0].serialNumber).toBe('SN-testdronetwo');
    })
  })
  describe('Adding drone to array of drones', () => {
    it('should add drone to the array, if no drone with same serial number exists', () => {
      const result = drones.updateDroneList(droneList, [newDrone]);
      expect(result.length).toBe(1);
      expect(result[0].serialNumber).toBe('SN-newDrone');
    }),
    it('should update drone informaton in the list, if drone exists', () => {
      dlist = drones.updateDroneList(droneList, [newDrone])
      const result = drones.updateDroneList(dlist, [newDroneUpdated]);
      expect(result.length).toBe(1);
      expect(result[0].serialNumber).toBe('SN-newDrone');
      expect(result[0].nestDistance < 50000).toBeTruthy();
    })
  })
})