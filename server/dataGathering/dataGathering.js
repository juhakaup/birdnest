const url = `https://assignments.reaktor.com/birdnest/drones`;

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