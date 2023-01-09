const config = require('../utils/config')
const url = config.DRONE_URL;

const fetch = (...args) => 
  import('node-fetch').then(({default: fetch}) => fetch(...args));

  const getDroneData = async () => {
    try {
      const result = await fetch(url, {method: 'GET'});
      return result.text();
    }
    catch (err) {
      console.log('Error', err);
    }
  };

module.exports = { getDroneData };