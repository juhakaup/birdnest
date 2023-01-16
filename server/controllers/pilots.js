const router = require('express').Router();
const fetch = (...args) => 
import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require('../utils/config')
const dg = require('../utils/dataGathering')

// Proxy pilot data and check that the pilot is offending the NDZ
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const drones = dg.getDrones()
  if (drones.some(drone => drone.serialNumber === id)) {
    try {
      const result = await fetch(config.PILOT_URL + req.params.id, {method: 'GET'});
      const data = await result.json();
      res.send(data)
    }
    catch (err) {
      console.log('Error', err);
    }
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

module.exports = router;