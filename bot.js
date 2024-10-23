const { Client, IntentsBitField, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const bot = new Client({ intents: [IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent] });

bot.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
  console.log(`Loaded command: ${command.name}`); // Log loaded commands
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', msg => {
  console.log(`Message received: ${msg.content}`);
  if (!msg.content.startsWith('!') || msg.author.bot) return;

  const args = msg.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  console.log(`Command received: ${commandName}`); // Log received command

  if (!bot.commands.has(commandName)) {
    console.log(`Command not found: ${commandName}`); // Log if command is not found
    return;
  }

  const command = bot.commands.get(commandName);

  try {
    command.execute(msg, args);
    console.log(`Executed command: ${commandName}`); // Log successful execution
  } catch (error) {
    console.error(error);
    msg.reply('There was an error trying to execute that command!');
  }
});

const config = fs.readFileSync('config.txt', 'utf8');
const token = config.trim();

bot.login(token);