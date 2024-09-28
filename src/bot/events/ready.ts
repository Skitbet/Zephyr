import { Client } from 'discord.js';

export const once = (client: Client): void => {
    console.log(`Logged in as ${client.user?.tag}!`);
};
