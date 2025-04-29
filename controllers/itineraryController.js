const { Itinerary, Day, Accommodation, Transfer, Activity } = require('../models');

exports.createItinerary = async (req, res) => {
  try {
    const { title, region, nights, days } = req.body;
    const itinerary = await Itinerary.create({ title, region, nights });

    for (const dayData of days) {
      const day = await Day.create({ dayNumber: dayData.dayNumber, ItineraryId: itinerary.id });

      if (dayData.accommodation) {
        await Accommodation.create({ ...dayData.accommodation, DayId: day.id });
      }

      for (const activity of dayData.activities || []) {
        await Activity.create({ ...activity, DayId: day.id });
      }

      for (const transfer of dayData.transfers || []) {
        await Transfer.create({ ...transfer, DayId: day.id });
      }
    }

    res.status(201).json({ message: 'Itinerary created successfully!', itineraryId: itinerary.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
};

exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      include: {
        model: Day,
        include: [Accommodation, Activity, Transfer],
      },
    });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch itineraries' });
  }
};

exports.getRecommendedItinerary = async (req, res) => {
  try {
    const { nights } = req.query;
    const itinerary = await Itinerary.findOne({
      where: { nights },
      include: {
        model: Day,
        include: [Accommodation, Activity, Transfer],
      },
    });

    if (!itinerary) {
      return res.status(404).json({ message: 'No recommended itinerary found for that duration.' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommended itinerary' });
  }
};


exports.deleteItinerary = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Itinerary.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

