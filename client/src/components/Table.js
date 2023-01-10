import { useEffect, Fragment, useState } from "react"
const pilotUrl = (process.env.NODE_ENV !== 'production') 
  ? 'http://localhost:8080/api/pilots/' 
  : '/api/pilots/';

// Displays the drones in a list, fetches pilot data and displays it below the selected drone.
const Table = ({ droneList, selectedDrone, setSelectedDrone, loading, pilotData }) => {
  const rarrow = <Fragment>&#11166;</Fragment>
  const darrow = <Fragment>&#11167;</Fragment>

  return (
      <table>
      <thead>
        <tr className="table-row-normal">
          <th className="align-left">Drone Id</th>
          <th>Time of observation</th>
          <th className="align-right">Closest observation</th>
        </tr>
      </thead>
      <tbody>
        { droneList.map((drone, index) => {
          const dateString = makeDateString(drone.captureTime);
          return (
            <Fragment>
              <tr key={index} className="table-row-normal" onClick={() => {setSelectedDrone(drone)}}>
                <td className="td-normal">{selectedDrone && (selectedDrone.serialNumber === drone.serialNumber) ? darrow : rarrow} {drone.serialNumber}</td>
                <td className="align-center">{dateString}</td>
                <td className="align-right">{(drone.nestDistance / 1000).toFixed(2)}m</td>
              </tr>
              {selectedDrone && (selectedDrone.serialNumber === drone.serialNumber) && <ExpandedRow loading={loading} data={pilotData}/> } 
            </Fragment>
          )}) }
      </tbody>
    </table>
  )
}

// display pilot information
const ExpandedRow = ({ loading, data }) => {
  if (loading) { return (
    <tr key={"loading"} className="expanded-row">
      <td>Loading...<br/></td><td></td><td></td>
    </tr>
  ) } else {
    const timeString = makeDateString(data.createdDt);
    return (
      <tr key={data.pilotId} className="expanded-row">
        <td>Pilot Id: {data.pilotId} <br /> Created: {timeString}</td>
        <td>First Name: {data.firstName} <br /> lastName: {data.lastName}</td>
        <td>email: {data.email} <br /> Phone: {data.phoneNumber}</td>
      </tr>
    )
  }
}

// Creates a usable string from date data
const makeDateString = (str) => {
  const time = new Date(str);
  return (`${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}-${time.getHours()}:${time.getMinutes().toString().slice(-2)}`);
}

export default Table;