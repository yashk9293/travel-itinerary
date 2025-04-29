const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Itinerary = sequelize.define('Itinerary', {
  title: DataTypes.STRING,
  region: DataTypes.STRING,
  nights: DataTypes.INTEGER,
});

const Day = sequelize.define('Day', {
  dayNumber: DataTypes.INTEGER,
});

const Accommodation = sequelize.define('Accommodation', {
  hotelName: DataTypes.STRING,
  location: DataTypes.STRING,
});

const Transfer = sequelize.define('Transfer', {
  from: DataTypes.STRING,
  to: DataTypes.STRING,
  mode: DataTypes.STRING,
});

const Activity = sequelize.define('Activity', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

// Define relationships
Itinerary.hasMany(Day);
Day.belongsTo(Itinerary);

Day.hasOne(Accommodation);
Accommodation.belongsTo(Day);

Day.hasMany(Activity);
Activity.belongsTo(Day);

Day.hasMany(Transfer);
Transfer.belongsTo(Day);

module.exports = { sequelize, Itinerary, Day, Accommodation, Activity, Transfer };
