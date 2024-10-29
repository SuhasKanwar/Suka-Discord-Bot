const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const { handleMessage } = require('./commands');
const { handleInteraction } = require('./interactions');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

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

app.listen(PORT, (err) => {
    if(err){
        console.log("Error creating the server")
    }
    else{
        console.log(`Server is listening on PORT -> ${PORT}`)
    }
})