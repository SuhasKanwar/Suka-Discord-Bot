const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', (message) => {
    if(message.author.bot){
        return;
    }
    if(message.content.startsWith('create')){
        const url = message.content.split("create")[1];
        return message.reply({
            content: "Generating Short ID for " + url
        });
    }
    else{
        message.reply({
            content: "Hi from the bot"
        });
    }
});

client.on('interactionCreate', (interaction) => {
    interaction.reply("Pong !!!");
});

client.login(
    token
);