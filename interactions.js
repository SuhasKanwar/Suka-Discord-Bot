const { EmbedBuilder } = require('discord.js');
const { config, utils } = require('./utils');
const { languageUtils } = require('./languages');
const { translate } = require('./commands');

async function handleInteraction(interaction) {
    if (interaction.isCommand()) {
        const { commandName } = interaction;

        if (commandName === 'ping') {
            const sent = await interaction.reply({ 
                content: 'Pinging...', 
                fetchReply: true 
            });
            
            const pingEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('🏓 Pong!')
                .addFields(
                    { name: '📡 Latency', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms` },
                    { name: '🤖 API Latency', value: `${Math.round(interaction.client.ws.ping)}ms` }
                );
                
            interaction.editReply({ content: null, embeds: [pingEmbed] });
        }

        if (commandName === 'translate') {
            const targetLang = interaction.options.getString('language').toLowerCase();
            const text = interaction.options.getString('text');

            if (!languageUtils.isSupported(targetLang)) {
                return interaction.reply({
                    embeds: [utils.createErrorEmbed(
                        'Unsupported language.',
                        'Use `suka languages` to see available languages.'
                    )],
                    ephemeral: true
                });
            }

            await interaction.deferReply();
            const langCode = languageUtils.getCode(targetLang) || targetLang;
            const translation = await translate(text, 'auto', langCode);

            const embedTranslation = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('🌐 Translation')
                .addFields(
                    { name: '📝 Original Text', value: text },
                    { name: `✨ Translated Text (${languageUtils.formatLanguageName(targetLang)})`, value: translation }
                )
                .setTimestamp()
                .setFooter({ text: 'Powered by Lingva Translate' });

            interaction.editReply({ embeds: [embedTranslation] });
        }
    }

    if (interaction.isAutocomplete()) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        let choices = languageUtils.getAllLanguages()
            .filter(lang => 
                lang.name.toLowerCase().includes(focusedValue) || 
                lang.code.toLowerCase().includes(focusedValue)
            )
            .map(lang => ({
                name: `${lang.name} (${lang.code})`,
                value: lang.code
            }))
            .slice(0, 25);

        await interaction.respond(choices);
    }
}

module.exports = { handleInteraction };