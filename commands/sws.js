const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'sws',
  description: 'SWS command',
  execute(message, args) {
    console.log(args);
    if (args === null || args.length === 0 || args.length > 1 || args[0].length !== 6 || args[0].match(/^[0-9]+$/) === null) {
      message.reply('Veuillez indiquer un code SWS.');
    } else {
      args.push('Voila le code SWS de cette periode');
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Code SoWeSign')
        .setDescription(args[1])
        .setThumbnail('https://pbs.twimg.com/profile_images/1216732724687527937/JCX7O4DR_400x400.jpg')
        .addFields(
          { name: 'SWS Code', value: args[0] },
        )
        .setTimestamp();
      
      message.reply({embeds: [exampleEmbed] });
      args[1] = 'le code est expiré';
      
    }
  },
};