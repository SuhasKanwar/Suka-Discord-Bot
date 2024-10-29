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
    if(message.content.toLowerCase() === 'hi suka'){
        message.reply({
            content: "Hi from the Suka your friendly bot"
        });
    }
});
async function translate(text, sourceLang = 'en', targetLang = 'es') {
    const response = await fetch(`https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
}

client.on('interactionCreate', (interaction) => {
    interaction.reply("Pong !!!");
});

client.login(
    token
);