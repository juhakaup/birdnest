import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "../App.css";

const droneIcon = new Icon({
    iconUrl: "./drone-svgrepo-com.svg",
    iconSize: [30,30]
  });

const nestIcon = new Icon({
  iconUrl: "./nest-svgrepo-com.svg",
  iconSize: [30,30]
});

const nestPos = [60.210075, 25.009575];

const DroneMap = ({ drones, selectedDrone, setSelectedDrone, loading, pilotData }) => {
  return (
    <MapContainer center={nestPos} zoom={17} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker for the nest */}
      <Marker key={'nest'} position={nestPos} icon={nestIcon}/>

      {/* Markers for the drones */}
      {drones.map(drone => (
        <Marker 
          key={drone.serialNumber} 
          position={ approximateGeoCoord(drone.positionX, drone.positionY) }
          icon={droneIcon}
          eventHandlers={{ click: () => setSelectedDrone(drone) }}
        />
      ))};

      {/* Popup for the selected drone */}
      {selectedDrone && (
        <Popup 
          position={approximateGeoCoord(selectedDrone.positionX, selectedDrone.positionY)}
          eventHandlers={{ remove: () => setSelectedDrone(null) }}
        >
          <div>
            <h3>{selectedDrone.serialNumber}</h3>
          </div>
          {!loading ? (
          <div>
              Pilot Id: {pilotData.pilotId} <br/>
              Name: {pilotData.firstName} {pilotData.lastName} <br/>
              email: {pilotData.email} <br /> Phone: {pilotData.phoneNumber}
          </div>
          ) : <div>Loading...</div>}
        </Popup>
      )}
  </MapContainer>
  )
}

const approximateGeoCoord = (distX, distY) => {
  // Approximate the distances in geocoordinates around the nest position.
  return [nestPos[0] + 1/111111111*(distY-250000), nestPos[1] + 1/55555555*(distX-250000)]
}

export default  DroneMap;