const sequelize = require('../config/database');
const { Itinerary, Day, Accommodation, Activity, Transfer } = require('../models');

const seed = async () => {
  await sequelize.sync({ force: true });

  const itineraries = [
    {
      title: 'Phuket 2 Nights Adventure',
      region: 'Phuket',
      nights: 2,
      days: [
        {
          dayNumber: 1,
          accommodation: { hotelName: 'Phuket Island Resort', location: 'Patong Beach' },
          activities: [{ name: 'Island Tour', description: 'Visit Phi Phi and James Bond Island' }],
          transfers: [{ from: 'Airport', to: 'Hotel', mode: 'Car' }],
        },
        {
          dayNumber: 2,
          accommodation: { hotelName: 'Phuket Island Resort', location: 'Patong Beach' },
          activities: [{ name: 'Elephant Jungle Sanctuary', description: 'Half-day elephant experience' }],
          transfers: [{ from: 'Hotel', to: 'Camp', mode: 'Van' }],
        },
      ],
    },
  ];

  for (const itineraryData of itineraries) {
    const itinerary = await Itinerary.create({
      title: itineraryData.title,
      region: itineraryData.region,
      nights: itineraryData.nights,
    });

    for (const dayData of itineraryData.days) {
      const day = await Day.create({ dayNumber: dayData.dayNumber, ItineraryId: itinerary.id });

      await Accommodation.create({ ...dayData.accommodation, DayId: day.id });

      for (const activity of dayData.activities || []) {
        await Activity.create({ ...activity, DayId: day.id });
      }

      for (const transfer of dayData.transfers || []) {
        await Transfer.create({ ...transfer, DayId: day.id });
      }
    }
  }

  console.log('✅ Seed complete');
  process.exit();
};

seed();
