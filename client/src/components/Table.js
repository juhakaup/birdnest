import { useEffect, Fragment, useState } from "react"

const ExpandedRow = ({ content, expandedItem, loading, data }) => {
  if (content.serialNumber === expandedItem && loading) return (
    (
      <tr key={data.pilotId} className="expanded-row">
        <td>Loading...<br/></td><td></td><td></td>
      </tr>
    )
  )

  if (content.serialNumber === expandedItem && !loading) {
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

const makeDateString = (str) => {
  const time = new Date(str);
  return (`${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}-${time.getHours()}:${time.getMinutes().toString().slice(-2)}`);
}

const Table = ({ content }) => {
  const [expandedItem, setExpandedItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const rarrow = <Fragment>&#11166;</Fragment>
  const darrow = <Fragment>&#11167;</Fragment>

  useEffect(() => {
    const getPilot = async () => {
      setLoading(true)
      try {
          const res = await fetch('http://localhost:3001/api/pilots/'+ expandedItem);
          const data = await res.json()
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error getting pilot information', error);
          setLoading(false)
          setExpandedItem('')
        }
    }
    getPilot();
  }, [expandedItem])

  return (
      <table>
      <thead>
        <tr className="table-row-normal">
          <th className="align-left">Drone</th>
          <th>Time</th>
          <th className="align-right">Distance</th>
        </tr>
      </thead>
      <tbody>
        { content.map((content, index) => {
          const dateString = makeDateString(content.captureTime);
          return (
            <Fragment>
              <tr key={index} className="table-row-normal" onClick={() => {setExpandedItem(content.serialNumber)}}>
                <td className="td-normal">{content.serialNumber === expandedItem ? darrow : rarrow} {content.serialNumber}</td>
                <td className="align-center">{dateString}</td>
                <td className="align-right">{(content.nestDistance / 1000).toFixed(2)}m</td>
              </tr>
              <ExpandedRow content={content} expandedItem={expandedItem} loading={loading} data={data}/>
            </Fragment>
          )}) }
      </tbody>
    </table>
  )
}

export default Table;