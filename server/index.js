const express = require('express');
const app = express();
const droneFilter = require('./utils/drones');
const url = `https://assignments.reaktor.com/birdnest/drones`;
const PORT = 3001;

app.get('/', (req, res) => {
  res.send(`Hello there!`)
});

const fetch = (...args) => 
  import('node-fetch').then(({default: fetch}) => fetch(...args));

const getData = async () => {
  try {
    const result = await fetch(url, {method: 'GET'});
    const data = await result.text();
    const drones = await droneFilter.filterDrones(data);
    console.log(drones);
  }
  catch (err) {
    console.log('Error', err);
  }
};

setInterval(() => {
  getData();
}, 2000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});