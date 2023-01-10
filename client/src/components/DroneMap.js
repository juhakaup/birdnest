import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "../App.css";

const droneIcon = new Icon({
    iconUrl: "./drone-svgrepo-com.svg",
    iconSize: [30,30]
  });

const DroneMap = ({ drones }) => {
  const [activeDrone, setActiveDrone] = useState(null);

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
              setActiveDrone(drone)
            },
          }}
        >

        </Marker>
      ))};
      {activeDrone && (
        <Popup position={[activeDrone.positionX/10000, activeDrone.positionY/10000]}>
          <div>
            <h3>{activeDrone.serialNumber}</h3>
          </div>
        </Popup>
      )}
  </MapContainer>
  )
}

export default  DroneMap;