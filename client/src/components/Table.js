import { useEffect, Fragment, useState } from "react"

const ExpandedRow = ({ content, expandedItem, loading, data }) => {
  if (content.serialNumber === expandedItem && loading) return (
    (
      <tr key={data.pilotId} className="expanded-row">
        <td>Loading...</td><td></td><td></td>
      </tr>
    )
  )

  if (content.serialNumber === expandedItem && !loading) {
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPilot = async () => {
      setLoading(true)
      try {
          const res = await fetch('http://localhost:3001/api/pilots/'+ expandedItem);
          const data = await res.json()
          console.log(data)
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error getting done data ', error);
          setLoading(false)
          setExpandedItem('')
        }
    }
    getPilot();
  }, [expandedItem])

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
              <tr key={index} onClick={() => {setExpandedItem(content.serialNumber)}}>
                <td>{content.serialNumber}</td>
                <td>{dateString}</td>
                <td>{(content.nestDistance / 1000).toFixed(2)}m</td>
              </tr>
              <ExpandedRow content={content} expandedItem={expandedItem} loading={loading} data={data}/>
            </Fragment>
          )}) }
      </tbody>
    </table>
  )
}

export default Table;