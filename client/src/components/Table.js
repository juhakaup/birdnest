import { Fragment, useState } from "react"

const ExpandedRow = ({ content, expandedItem }) => {
  if (content.serialNumber === expandedItem) {
    const data = {
      pilotId: "P-ZOo0Fo7y6k",
      firstName: "Kari",
      lastName: "Cartwright",
      phoneNumber: "+210649698295",
      createdDt: "2022-07-12T02:13:50.640Z",
      email: "kari.cartwright@example.com"
      }
    return (
      <tr key={data.pilotId} className="expanded-row">
        <td>Pilot Id: {data.pilotId} <br /> Created: {data.createdDt}</td>
        <td>First Name: {data.firstName} <br /> lastName: {data.lastName}</td>
        <td>email: {data.email} <br /> Phone: {data.phoneNumber}</td>
      </tr>
    )
  }
}

const Table = ({ content }) => {
  const [expandedItem, setExpandedItem] = useState('');

  return (
      <table>
      <thead>
        <tr>
          <th>Drone</th>
          <th>Time</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        { content.map((content, index) => {
          const time = new Date(content.captureTime);
          const dateString = `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}-${time.getHours()}:${time.getMinutes().toString().slice(-2)}`;
          return (
            <Fragment>
              <tr key={index} onClick={() => setExpandedItem(content.serialNumber)}>
                <td>{content.serialNumber}</td>
                <td>{dateString}</td>
                <td>{(content.nestDistance / 1000).toFixed(2)}m</td>
              </tr>
              <ExpandedRow content={content} expandedItem={expandedItem} />
            </Fragment>
          )}) }
      </tbody>
    </table>
  )
}

export default Table;