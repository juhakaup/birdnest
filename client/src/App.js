import Table from "./components/Table";
import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [droneList, setDroneList] = useState([]);

  const fetchDroneData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/drones');
      const data = await res.json()
     setDroneList(data);
    } catch (error) {
      console.error('Error getting done data ', error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDroneData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <h1>Birdnest</h1>
      <p>Drone monitoring service</p>
      <h2>Drones violating the 'no-drone-zone':</h2>
      <Table content={droneList} ></Table>
    </div>
  );
}

export default App;
