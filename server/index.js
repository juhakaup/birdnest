const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors')
const dg = require('./utils/dataGathering')

// Starts the data gathering
dg.gatherData();

// Routes
const droneRoutes = require('./controllers/drones');
const pilotRoutes = require('./controllers/pilots');

// middleware
app.use(cors())
app.use('/api/drones', droneRoutes);
app.use('/api/pilots', pilotRoutes);
app.use(express.static('build'));

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});