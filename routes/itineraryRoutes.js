const express = require('express');
const router = express.Router();
const {
  createItinerary,
  getItineraries,
  getRecommendedItinerary,
  deleteItinerary,
} = require('../controllers/itineraryController');

// Create a new itinerary with error handling
router.post('/', async (req, res) => {
  const { title, region, nights, days } = req.body;

  // Validate that 'title' and 'nights' are provided
  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  if (!nights) {
    return res.status(400).json({ error: 'Nights are required.' });
  }

  // Validate that 'days' array exists and is not empty
  if (!Array.isArray(days) || days.length === 0) {
    return res.status(400).json({ error: 'At least one day is required.' });
  }

  // Call the controller function to save the itinerary
  try {
    await createItinerary(req, res);  // Assuming the controller handles the actual DB save
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create itinerary.' });
  }
});

// Get all itineraries
router.get('/', getItineraries);

// Get recommended itineraries
router.get('/recommended', getRecommendedItinerary);

// route to delete an itinerary by ID
router.delete('/:id', deleteItinerary);

module.exports = router;
