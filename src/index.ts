import Zephyr from './bot/Zephyr';
import { startDashboard } from './dashboard/Dashboard';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of the Zephyr bot with the token from environment variables
const bot = new Zephyr(process.env.TOKEN as string); // Cast to string to avoid TypeScript errors
bot.start();

// Start the dashboard on the specified port
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000; // Default to 3000 if PORT is not set
startDashboard(port);
