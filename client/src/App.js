import Table from "./components/Table";
import DroneMap from "./components/DroneMap";
import { useState, useEffect } from "react";
import './App.css'
const droneUrl = (process.env.NODE_ENV !== 'production') 
  ? 'http://localhost:8080/api/drones' 
  : '/api/drones';

function App() {
  const [droneList, setDroneList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  

  return (
    <div className="main-container">
      <h1>Birdnest</h1>
      <p>Drone monitoring service</p>
      <h3>Drones violating the 'no-drone-zone' during the last 10 minutes:</h3>
      <DroneMap drones={droneList}/>
      <Table content={droneList} ></Table>
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
