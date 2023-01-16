const express = require('express');
const router = express.Router();
let dg = require('../utils/dataGathering')

// Returns the drone sightings in the no drone zone from the last 10 minsutes
router.get('/', (req, res) => {
  const data = dg.getDrones();
  res.send(data)
});

module.exports = router;