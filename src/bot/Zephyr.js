const { Client, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/EventHandler');
const { registerCommands } = require('./handlers/CommandHandler')

class Zephyr {
    constructor(token) {
        this.client = new Client({
            intents: ['Guilds', 'GuildMessages']
        });

        this.client.commands = new Collection();
        this.token = token;

        this.loadBot();
    }

    async loadBot() {
        await registerCommands(this.client);
        loadEvents(this.client);
    }

    start() {
        console.log("Bot is now logging in.")
        this.client.login(this.token);
    }
}

module.exports = Zephyr;