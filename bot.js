const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  {
    name: 'sws',
    description: 'SWS command',
    options: [
      {
        name: 'code',
        type: 3, // Correct type for STRING
        description: 'The SWS code',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'sws') {
    const code = options.getString('code');
    if (code.length !== 6 || !/^[0-9]+$/.test(code)) {
      await interaction.reply('Veuillez indiquer un code SWS.');
    } else {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Code SoWeSign')
        .setDescription('Voila le code SWS de cette periode')
        .setThumbnail('https://pbs.twimg.com/profile_images/1216732724687527937/JCX7O4DR_400x400.jpg')
        .addFields(
          { name: 'SWS Code', value: code },
        )
        .setTimestamp();
      
      await interaction.reply({content:"@everyone", embeds: [exampleEmbed] });
    }
  }
});

client.login(token);