const { Client, GatewayIntentBits } = require('discord.js');
const { handleMessage } = require('./commands');
const { handleInteraction } = require('./interactions');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('translations | suka help', { type: 'WATCHING' });
});

client.on('messageCreate', handleMessage);
client.on('interactionCreate', handleInteraction);

client.login(process.env.DISCORD_BOT_TOKEN);