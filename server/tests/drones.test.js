const drones = require('../utils/drones')

testData = 
`<report>
  <deviceInformation deviceId="GUARDB1RD">
    <listenRange>500000</listenRange>
    <deviceStarted>2022-12-20T15:21:53.882Z</deviceStarted>
    <uptimeSeconds>61931</uptimeSeconds>
    <updateIntervalMs>2000</updateIntervalMs>
  </deviceInformation>
  <capture snapshotTimestamp="2022-12-21T08:34:05.447Z">
    <drone>
      <serialNumber>SN-testdroneone</serialNumber>
      <model>Falcon</model>
      <manufacturer>MegaBuzzer Corp</manufacturer>
      <mac>24:43:c4:32:50:cf</mac>
      <ipv4>68.33.12.103</ipv4>
      <ipv6>7d81:cdac:4247:d75d:7909:6ddf:a25d:0709</ipv6>
      <firmware>1.2.8</firmware>
      <positionY>400000.0</positionY>
      <positionX>300000.0</positionX>
      <altitude>4922.342342007861</altitude>
    </drone>
    <drone>
      <serialNumber>SN-testdronetwo</serialNumber>
      <model>Eagle</model>
      <manufacturer>MegaBuzzer Corp</manufacturer>
      <mac>4c:12:78:f8:eb:e8</mac>
      <ipv4>97.63.116.136</ipv4>
      <ipv6>e922:6658:9e0b:5636:1ffe:3818:2999:da83</ipv6>
      <firmware>6.7.7</firmware>
      <positionY>260000.0</positionY>
      <positionX>210000.0</positionX>
      <altitude>4963.4561473111</altitude>
    </drone>
  </capture>
</report>`;


test('drone filtering works', async () => {
  const result = await drones.filterDrones(testData);

  expect(result.length).toBe(1);
  expect(result[0].serialNumber).toBe('SN-testdronetwo');
});
