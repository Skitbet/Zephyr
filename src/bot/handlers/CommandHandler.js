const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

async function registerCommands(client) {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).reduce((acc, dir) => {
        const files = fs.readdirSync(path.join(__dirname, '../commands', dir)).filter(file => file.endsWith('.js'));
        return [...acc, ...files.map(file => path.join(dir, file))];
    }, []);

    const commands = [];

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (command.data && command.execute) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }
    }

    await client.commands.set(commands);
    await deployCommands(commands);
}

async function deployCommands(commands) {
    const rest = new REST().setToken(process.env.TOKEN);
    console.log(`Started refreashing ${commands.length} application / commands.`);

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
    );
}

module.exports = { registerCommands };