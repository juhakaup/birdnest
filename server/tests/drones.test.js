const drones = require('../drones/drones')

testData = 
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
          serialNumber: 'SN-6bbyKxYoPd',
          model: 'Falcon',
          manufacturer: 'MegaBuzzer Corp',
          mac: 'c1:1f:01:2d:8e:77',
          ipv4: '171.27.73.21',
          ipv6: 'd050:cf65:54ee:15f7:d9c6:db06:61b1:8ae0',
          firmware: '8.6.1',
          positionY: '318986.65864460455',
          positionX: '382584.54860719707',
          altitude: '4054.4436681637744'
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


test('drone filtering works', async () => {
  const result = await drones.filterDrones(testData);

  expect(result.length).toBe(1);
  expect(result[0].serialNumber).toBe('SN-testdronetwo');
});
