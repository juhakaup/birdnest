import Table from "./components/Table";
import DroneMap from "./components/DroneMap";
import { useState, useEffect } from "react";
import './App.css'
const droneUrl = (process.env.NODE_ENV !== 'production') 
  ? 'http://localhost:8080/api/drones' 
  : '/api/drones';
  const pilotUrl = (process.env.NODE_ENV !== 'production') 
  ? 'http://localhost:8080/api/pilots/' 
  : '/api/pilots/';

function App() {
  const [droneList, setDroneList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPilot, setLoadingPilot] = useState(true);
  const [pilotData, setPilotData] = useState(null);
  const [selectedDrone, setSelectedDrone] = useState(null)

  const fetchDroneData = async () => {
    try {
      const res = await fetch(droneUrl);
      const data = await res.json()
      setDroneList(data);
      data.sort(sortByProperty('captureTime'))
      setLoading(false);
    } catch (error) {
      console.error('Error getting done data ', error);
    }
  }

  // Fetches drone data once mounted, then every 2 seconds.
  useEffect(() => {
    fetchDroneData();
    const interval = setInterval(() => {
      fetchDroneData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetches pilot data as drone is selected
  useEffect(() => {
    const getPilot = async () => {
      if (selectedDrone) {
        setLoadingPilot(true)
        try {
            const res = await fetch(pilotUrl + selectedDrone.serialNumber);
            const data = await res.json()
            setPilotData(data);
            setLoadingPilot(false);
          } catch (error) {
            console.error('Error getting pilot information', error);
            setLoadingPilot(false);
            setSelectedDrone=(null);
          }
      }
    }
    getPilot();
  }, [selectedDrone])

  return (
    <div className="main-container">
      <h1>Birdnest</h1>
      <p>Drone monitoring service</p>
      <h3>Drones violating the 'no-drone-zone' during the last 10 minutes:</h3>
      <DroneMap 
        drones={droneList} 
        setSelectedDrone={setSelectedDrone} 
        selectedDrone={selectedDrone} 
        pilotData={pilotData}
        loading={loadingPilot} 
      />
      <Table 
        droneList={droneList} 
        loading={loadingPilot} 
        selectedDrone={selectedDrone} 
        setSelectedDrone={setSelectedDrone} 
        pilotData={pilotData}/>
      {loading && <h2>Loading...</h2>}
    </div>
  );
}

// Sort function for array sort method
const sortByProperty = (property) => {
  return function (a, b) {
    return  a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
  }
} 

export default App;
