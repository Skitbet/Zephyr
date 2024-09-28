import { REST, Routes, Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { __dirname } from '../../utils'; 

async function registerCommands(client: Client): Promise<void> {
    // Define the path to the commands directory
    const commandsPath = path.join(__dirname, 'bot', 'commands');
    
    // Read command files from the commands directory
    const commandFiles: string[] = fs.readdirSync(commandsPath).reduce((acc: string[], dir: string) => {
        const files = fs.readdirSync(path.join(commandsPath, dir)).filter(file => file.endsWith('.ts'));
        return [...acc, ...files.map(file => path.join(dir, file))];
    }, []);


    const commands: any[] = []; 

    // importing the command and adding it to collection with data
    for (const file of commandFiles) {
        const command = await import(`../commands/${file}`); 
        if (command.data && command.execute) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }
    }

    // deploy the commands to all guilds
    await deployCommands(commands);
}

async function deployCommands(commands: any[]): Promise<void> {
    const rest = new REST().setToken(process.env.TOKEN as string);
    console.log(`Started refreshing ${commands.length} application / commands.`);

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID as string),
        { body: commands },
    );
}

export { registerCommands };
