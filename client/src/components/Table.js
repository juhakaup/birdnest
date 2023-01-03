const Table = ({ content }) => {
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
          { content.map((content, i) => {
            return (<tr key={i}>
              <td>{content.serialNumber}</td>
              <td>{content.captureTime}</td>
              <td>{content.nestDistance}</td>
              </tr>)}) }
        </tbody>
      </table>
    )
}

export default Table;