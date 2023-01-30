// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('/home/container/config.json');
const reportTrader = require('/home/container/schedule.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

const commandFiles = fs.readdirSync('/home/container/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on('ready', async () => {
  console.log('Ready!');
  client.user.setPresence({
    activities: [{ name: '/명령어', type: ActivityType.Listening }]
  });
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    if (!interaction.isCommand()) return;
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// client.on('debug', console.log);
client.login(token);
reportTrader(client);
