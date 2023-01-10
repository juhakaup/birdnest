import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "../App.css";

const droneIcon = new Icon({
    iconUrl: "./drone-svgrepo-com.svg",
    iconSize: [30,30]
  });

const DroneMap = ({ drones, selectedDrone, setSelectedDrone, loading, pilotData }) => {
  return (
    <MapContainer center={[25.0, 25.0]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {drones.map(drone => (
        <Marker 
          key={drone.serialNumber} 
          position={[drone.positionX/10000, drone.positionY/10000]}
          icon={droneIcon}
          eventHandlers={{
            click: () => {
              setSelectedDrone(drone);
            },
          }}
        >

        </Marker>
      ))};
      {selectedDrone && (
        <Popup position={[selectedDrone.positionX/10000, selectedDrone.positionY/10000]}>
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

export default  DroneMap;