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

app.get('/', (req, res) => {
    return res.end("Bot is live and working fine\nUse this link to add it to your discord -> https://discord.com/oauth2/authorize?client_id=1284383939896803349&permissions=8&integration_type=0&scope=bot")
})

app.listen(PORT, (err) => {
    if(err){
        console.log("Error creating the server")
    }
    else{
        console.log(`Server is listening on PORT -> ${PORT}`)
    }
})