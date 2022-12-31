const express = require('express');
const router = express.Router();
let drones = [];

router.get('/', (req, res) => {
  res.send(drones)
});

const updateDroneData = (data) => {
  drones = data;
}

module.exports = { router, updateDroneData }