const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildIds, token } = require('/home/container/config.json');

const commands = [];
const commandFiles = fs.readdirSync('/home/container/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`/home/container/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  guildIds.map(async (guildId) => {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log(`${guildId} success!`);
    } catch (error) {
        console.error(error);
    }
  });
})();