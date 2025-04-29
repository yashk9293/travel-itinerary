const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('travelDB', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './travel.db',
  logging: false,
});

module.exports = sequelize;
