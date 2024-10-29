const { EmbedBuilder } = require('discord.js');

const config = {
    prefix: 'suka',
    embedColor: '#0099ff',
    maxRetries: 3,
    greetings: {
        responses: [
            "Hello! How can I help you today? 👋",
            "Hi there! Ready to translate something? 🌍",
            "Greetings! Need help with translation? 🤗"
        ],
        emojis: ['👋', '🌍', '🤗', '✨', '🌟'],
        timeBasedGreetings: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening",
            night: "Good night"
        }
    },
    easter_eggs: {
        'good bot': ['Thank you! 😊', '*happy bot noises* 🤖'],
        'bad bot': ['I\'ll try to do better! 😔', 'Sorry for the inconvenience! 🙏']
    }
};

const utils = {
    getRandomItem: (array) => array[Math.floor(Math.random() * array.length)],
    
    getTimeBasedGreeting: () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return config.greetings.timeBasedGreetings.morning;
        if (hour >= 12 && hour < 17) return config.greetings.timeBasedGreetings.afternoon;
        if (hour >= 17 && hour < 22) return config.greetings.timeBasedGreetings.evening;
        return config.greetings.timeBasedGreetings.night;
    },

    createErrorEmbed: (message, suggestion = '') => {
        return new EmbedBuilder()
            .setColor('#ff6b6b')
            .setTitle('❌ Error')
            .setDescription(message)
            .setFooter({ text: suggestion || 'Try "suka help" for assistance' });
    }
};

module.exports = { config, utils };