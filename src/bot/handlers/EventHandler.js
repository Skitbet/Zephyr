const fs = require('fs');
const path = require('path');

function loadEvents(client) {
    const eventFiles = fs.readdirSync(path.join(__dirname, "../events"));

    for (const file of eventFiles) {
        const eventName = path.basename(file, '.js');
        const event = require(`../events/${file}`);

        if (typeof event.once == 'function') {
            client.once(eventName, (...args) => event.once(...args, client));
        }

        if (typeof event.on == 'function') {
            client.on(eventName, (...args) => event.on(...args, client));
        }
    }
}

module.exports = { loadEvents };