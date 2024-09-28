// Import necessary modules from Discord.js
import { Client, Collection } from 'discord.js';
import { loadEvents } from './handlers/EventHandler';
import { registerCommands } from './handlers/CommandHandler';

class Zephyr {
  private client: Client;
  private token: string;

  constructor(token: string) {
    // Initialize the Discord client with intents
    this.client = new Client({
      intents: ["Guilds", "GuildMessages"],
    });

    // Initialize the commands collection
    this.client.commands = new Collection();
    this.token = token;

    // Load the bot functionality (commands, events)
    this.loadBot();
  }

  private async loadBot(): Promise<void> {
    // Await the registration of commands
    await registerCommands(this.client);

    // Load event handlers
    loadEvents(this.client);
  }

  public start(): void {
    console.log('Bot is now logging in.');
    this.client.login(this.token);
  }
}

export default Zephyr;
