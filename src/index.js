const Zephyr = require('./bot/Zephyr');
const { startDashboard } = require('./dashboard/Dashboard');

require('dotenv').config();

const bot = new Zephyr(process.env.TOKEN);
bot.start();

startDashboard(process.env.PORT);