import Table from "./components/Table";
import { useState, useEffect } from "react";

function App() {
  const [droneList, setDroneList] = useState([]);

  const fetchDroneData = async () => {
    const res = await fetch('http://localhost:3001/api/drones');
    const data = await res.json()
    setDroneList(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDroneData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Birdnest</h1>
      <Table content={droneList} ></Table>
    </div>
  );
}

export default App;
