const { EmbedBuilder } = require('discord.js');
const { languageUtils } = require('./languages');
const { config, utils } = require('./utils');

async function translate(text, sourceLang = 'en', targetLang = 'en') {
    const response = await fetch(`https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
}

const commands = {
    async translate(message, args) {
        try {
            const targetLang = args[0]?.toLowerCase();
            const textToTranslate = args.slice(1).join(' ');

            if (!targetLang || !textToTranslate) {
                return message.reply({ 
                    embeds: [utils.createErrorEmbed(
                        'Please provide both language and text to translate.',
                        'Usage: suka translate [language] [text]'
                    )] 
                });
            }

            if (!languageUtils.isSupported(targetLang)) {
                return message.reply({ 
                    embeds: [utils.createErrorEmbed(
                        'Unsupported language.',
                        'Use `suka languages` to see available languages.'
                    )] 
                });
            }

            const langCode = languageUtils.getCode(targetLang) || targetLang;
            await message.channel.sendTyping();
            
            const translation = await translate(textToTranslate, 'auto', langCode);
            
            const embedTranslation = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('🌐 Translation')
                .addFields(
                    { name: '📝 Original Text', value: textToTranslate },
                    { name: `✨ Translated Text (${languageUtils.formatLanguageName(targetLang)})`, value: translation }
                )
                .setTimestamp()
                .setFooter({ text: 'Powered by LibreTranslate • Type "suka help" for more commands' });

            return message.reply({ embeds: [embedTranslation] });
        } catch (error) {
            console.error('Translation command error:', error);
            return message.reply({ 
                embeds: [utils.createErrorEmbed(
                    'An error occurred while translating.',
                    'Please try again later or use a different language.'
                )] 
            });
        }
    },

    async detect(message, args) {
        const textToTranslate = args.join(' ');
        if (!textToTranslate) {
            return message.reply({ 
                embeds: [utils.createErrorEmbed(
                    'Please provide text to detect.',
                    'Usage: suka detect [text]'
                )] 
            });
        }

        message.channel.sendTyping();
        const translation = await translate(textToTranslate, 'auto', 'en');
        
        const embedDetect = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🔍 Language Detection')
            .addFields(
                { name: '📝 Original Text', value: textToTranslate },
                { name: '✨ English Translation', value: translation }
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by Lingva Translate' });

        message.reply({ embeds: [embedDetect] });
    },

    async languages(message) {
        const languages = languageUtils.getAllLanguages()
            .map(lang => `${languageUtils.formatLanguageName(lang.name)}: \`${lang.code}\``)
            .sort();
        
        const chunkedLanguages = [];
        for (let i = 0; i < languages.length; i += 20) {
            chunkedLanguages.push(languages.slice(i, i + 20));
        }
        
        for (let i = 0; i < chunkedLanguages.length; i++) {
            const embedLanguages = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle(`🌍 Available Languages (Page ${i + 1}/${chunkedLanguages.length})`)
                .setDescription(chunkedLanguages[i].join('\n'))
                .setFooter({ 
                    text: `Page ${i + 1}/${chunkedLanguages.length} • Use these codes with the translate command`
                });
            
            message.channel.send({ embeds: [embedLanguages] });
        }
    },

    async help(message) {
        const embedHelp = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🤖 Suka Bot Commands')
            .setDescription('Here are all available commands:')
            .addFields(
                { 
                    name: '🌐 Translation Commands', 
                    value: 
                    '`suka translate [language] [text]` - Translates text to specified language\n' +
                    '`suka detect [text]` - Auto-detects language and translates to English\n' +
                    '`suka languages` - Shows list of available language codes'
                },
                { 
                    name: '⚙️ Utility Commands', 
                    value: '`suka help` - Shows this help message\n`/ping` - Check bot latency'
                },
                {
                    name: '📝 Examples',
                    value:
                    '`suka translate spanish Hello, how are you?`\n' +
                    '`suka translate fr Bonjour`\n' +
                    '`suka detect こんにちは`'
                }
            )
            .setFooter({ text: 'Tip: You can use either language names or codes!' });

        message.reply({ embeds: [embedHelp] });
    }
};

function handleMessage(message) {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    
    for (const [trigger, responses] of Object.entries(config.easter_eggs)) {
        if (content.includes(trigger)) {
            return message.reply(utils.getRandomItem(responses));
        }
    }

    if (content.startsWith(config.prefix)) {
        const args = content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (['hi', 'hello', 'hey'].includes(command)) {
            const timeGreeting = utils.getTimeBasedGreeting();
            const greetingEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle(`${timeGreeting}, ${message.author.username}! ${utils.getRandomItem(config.greetings.emojis)}`)
                .setDescription(utils.getRandomItem(config.greetings.responses))
                .addFields({ 
                    name: '💡 Quick Help', 
                    value: 'Try these commands:\n`suka translate` - Translate text\n`suka help` - See all commands' 
                })
                .setTimestamp();

            return message.reply({ embeds: [greetingEmbed] });
        }

        if (commands[command]) {
            commands[command](message, args);
        } else {
            message.reply({ 
                embeds: [utils.createErrorEmbed(
                    'Unknown command',
                    'Use `suka help` to see available commands'
                )] 
            });
        }
    }
}

module.exports = {
    handleMessage,
    commands,
    translate
};