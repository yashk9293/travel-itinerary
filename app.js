const express = require('express');
const app = express();
const itineraryRoutes = require('./routes/itineraryRoutes');

app.use(express.json());
app.use('/api/itineraries', itineraryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
