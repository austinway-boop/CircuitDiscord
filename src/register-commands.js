import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'ping',
    description: 'Check if the bot is responding and view latency',
  },
  {
    name: 'hello',
    description: 'Get a friendly greeting from Circuit Bot',
  },
  {
    name: 'info',
    description: 'Get detailed information about Circuit Bot',
  },
  {
    name: 'help',
    description: 'Display all available commands',
  },
  {
    name: 'stats',
    description: 'View bot statistics and uptime information',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

async function registerCommands() {
  try {
    console.log('🔄 Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID),
      { body: commands }
    );

    console.log('✅ Successfully registered slash commands!');
    console.log(`📝 Registered ${commands.length} commands:`);
    commands.forEach((cmd) => console.log(`   - /${cmd.name}`));
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

registerCommands();

