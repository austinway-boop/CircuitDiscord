const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  { name: 'ping', description: 'Check bot latency' },
  { name: 'hello', description: 'Get a greeting' },
  { name: 'info', description: 'Bot information' },
  { name: 'help', description: 'Show all commands' }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('🔄 Registering commands...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID),
      { body: commands }
    );
    console.log('✅ Commands registered!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();

