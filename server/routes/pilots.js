const router = require('express').Router();
const fetch = (...args) => 
import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require('../utils/config')

// Pilot data proxy
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const result = await fetch(config.PILOT_URL + req.params.id, {method: 'GET'});
    const data = await result.json();
    res.send(data)
  }
  catch (err) {
    console.log('Error', err);
  }
});

module.exports = router;