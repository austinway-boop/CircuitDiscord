/**
 * Register slash commands with Discord
 */

const APPLICATION_ID = '1444014145438486589';
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

const commands = [
  {
    name: 'ping',
    description: 'Check if the bot is responding',
    type: 1
  },
  {
    name: 'hello',
    description: 'Get a friendly greeting from Circuit Bot',
    type: 1
  },
  {
    name: 'info',
    description: 'Get detailed information about Circuit Bot',
    type: 1
  },
  {
    name: 'help',
    description: 'Display help and available commands',
    type: 1
  }
];

async function registerCommands() {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  try {
    console.log('🔄 Registering commands...');
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${BOT_TOKEN}`
      },
      body: JSON.stringify(commands)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to register commands: ${error}`);
    }

    const data = await response.json();
    console.log('✅ Successfully registered commands!');
    console.log(`📝 Registered ${commands.length} commands`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

registerCommands();

