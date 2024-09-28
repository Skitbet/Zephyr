import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';
import { __dirname } from '../../utils'; 

function loadEvents(client: Client): void {
    const eventFiles: string[] = fs.readdirSync(path.join(__dirname, '/bot/events'));

    for (const file of eventFiles) {
        const eventName = path.basename(file, '.ts'); // Use .ts if your files are TypeScript

        // Use dynamic import for ES module compatibility
        import(`../events/${file}`).then(event => {
            if (typeof event.once === 'function') {
                client.once(eventName, (...args: any[]) => event.once(...args, client));
            }

            if (typeof event.on === 'function') {
                client.on(eventName, (...args: any[]) => event.on(...args, client));
            }
        }).catch(err => {
            console.error(`Failed to load event ${eventName}:`, err);
        });
    }
}

export { loadEvents };
