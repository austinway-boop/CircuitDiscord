import { Client, GatewayIntentBits, ActivityType, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { startDashboard } from './dashboard.js';

dotenv.config();

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot state
let botEnabled = true;
export const interactionLogs = [];
export const errorLogs = [];
const MAX_LOGS = 100;

// Export bot control functions
export function isBotEnabled() {
  return botEnabled;
}

export function setBotEnabled(enabled) {
  botEnabled = enabled;
  console.log(`Bot ${enabled ? 'ENABLED' : 'DISABLED'}`);
}

export function logInteraction(type, command, user) {
  interactionLogs.unshift({
    timestamp: new Date().toISOString(),
    type,
    command,
    user
  });
  if (interactionLogs.length > MAX_LOGS) interactionLogs.pop();
}

export function logError(error, details) {
  errorLogs.unshift({
    timestamp: new Date().toISOString(),
    error: error.toString(),
    details: details || 'No details'
  });
  if (errorLogs.length > MAX_LOGS) errorLogs.pop();
  console.error(`[ERROR] ${error}:`, details);
}

export function clearLogs() {
  interactionLogs.length = 0;
  errorLogs.length = 0;
}

export function getClient() {
  return client;
}

// Bot ready event
client.once('ready', () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     ⚡ CIRCUIT BOT IS ONLINE! ⚡      ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`\n🤖 Logged in as: ${client.user.tag}`);
  console.log(`📊 Servers: ${client.guilds.cache.size}`);
  console.log(`👥 Users: ${client.users.cache.size}`);
  console.log(`\n🌐 Dashboard: http://localhost:${process.env.DASHBOARD_PORT || 3000}`);
  console.log(`\n✅ Bot is ready to receive commands!\n`);

  // Set bot status
  client.user.setPresence({
    activities: [{ name: '/help | Circuit Bot', type: ActivityType.Playing }],
    status: 'online',
  });
});

// Handle slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user } = interaction;

  // Log interaction
  logInteraction('COMMAND', commandName, user.username);

  // Check if bot is enabled
  if (!botEnabled) {
    await interaction.reply({
      content: '⏸️ **Bot is currently disabled** by the administrator. Please try again later.',
      ephemeral: true
    });
    return;
  }

  try {
    switch (commandName) {
      case 'ping':
        await interaction.reply({
          content: `🏓 **Pong!** Circuit Bot is online!\n⏱️ Latency: ${client.ws.ping}ms`,
        });
        break;

      case 'hello':
        await interaction.reply({
          content: `👋 Hello, ${interaction.user}!\n\n⚡ Welcome to **Circuit Bot**! I'm online and ready to help.\n\nTry \`/info\` to learn more about me, or \`/help\` to see all commands!`,
        });
        break;

      case 'info':
        const infoEmbed = new EmbedBuilder()
          .setTitle('⚡ Circuit Bot Information')
          .setDescription('**A fully-featured Discord bot with web dashboard!**\n\n✅ This bot is online 24/7 and ready to serve!')
          .setColor(0x00D9FF)
          .addFields(
            { name: '🤖 Bot Status', value: '✅ **ONLINE**', inline: true },
            { name: '📦 Version', value: 'v2.0.0', inline: true },
            { name: '⚙️ Platform', value: 'Node.js', inline: true },
            { name: '⚡ Latency', value: `${client.ws.ping}ms`, inline: true },
            { name: '🌍 Servers', value: `${client.guilds.cache.size}`, inline: true },
            { name: '👥 Users', value: `${client.users.cache.size}`, inline: true },
            { 
              name: '📝 Available Commands', 
              value: '`/ping` - Test bot\n`/hello` - Get greeting\n`/info` - Bot info\n`/help` - Command list\n`/stats` - Bot statistics', 
              inline: false 
            },
            { 
              name: '🔗 Features', 
              value: '• Web Dashboard\n• Error Logging\n• Command Tracking\n• 24/7 Uptime\n• Real-time Status', 
              inline: false 
            }
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter({ text: 'Circuit Bot • Always Online' })
          .setTimestamp();

        await interaction.reply({ embeds: [infoEmbed] });
        break;

      case 'help':
        const helpEmbed = new EmbedBuilder()
          .setTitle('📚 Circuit Bot - Command Help')
          .setDescription('Here are all available commands:')
          .setColor(0x5865F2)
          .addFields(
            { name: '🏓 `/ping`', value: 'Check bot latency and response time', inline: false },
            { name: '👋 `/hello`', value: 'Get a friendly greeting from Circuit Bot', inline: false },
            { name: '⚡ `/info`', value: 'View detailed information about the bot', inline: false },
            { name: '📚 `/help`', value: 'Display this help message', inline: false },
            { name: '📊 `/stats`', value: 'View bot statistics and uptime', inline: false },
            { 
              name: '\u200B', 
              value: '**💡 Bot Features:**\n✅ Always online and ready\n✅ Fast response times\n✅ Web dashboard for monitoring\n✅ Error tracking and logging\n✅ Real-time statistics', 
              inline: false 
            }
          )
          .setFooter({ text: 'Need more help? Contact an admin!' })
          .setTimestamp();

        await interaction.reply({ embeds: [helpEmbed] });
        break;

      case 'stats':
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const statsEmbed = new EmbedBuilder()
          .setTitle('📊 Circuit Bot Statistics')
          .setColor(0x00D9FF)
          .addFields(
            { name: '⏱️ Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true },
            { name: '⚡ Latency', value: `${client.ws.ping}ms`, inline: true },
            { name: '🌐 Servers', value: `${client.guilds.cache.size}`, inline: true },
            { name: '👥 Total Users', value: `${client.users.cache.size}`, inline: true },
            { name: '📝 Commands Used', value: `${interactionLogs.length}`, inline: true },
            { name: '⚠️ Errors Logged', value: `${errorLogs.length}`, inline: true },
            { name: '💾 Memory Usage', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, inline: true },
            { name: '🤖 Bot Status', value: botEnabled ? '✅ Enabled' : '⏸️ Disabled', inline: true },
            { name: '📡 Node.js', value: process.version, inline: true }
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter({ text: 'Circuit Bot Statistics' })
          .setTimestamp();

        await interaction.reply({ embeds: [statsEmbed] });
        break;

      default:
        await interaction.reply({
          content: '❌ Unknown command! Use `/help` to see available commands.',
          ephemeral: true
        });
        logError('Unknown command', `Command: ${commandName}`);
    }
  } catch (error) {
    console.error('Error handling command:', error);
    logError(error.message, `Command: ${commandName}, User: ${user.username}`);
    
    try {
      await interaction.reply({
        content: '❌ An error occurred while processing your command. Please try again later.',
        ephemeral: true
      });
    } catch (e) {
      console.error('Failed to send error message:', e);
    }
  }
});

// Error handling
client.on('error', (error) => {
  console.error('Discord client error:', error);
  logError('Client Error', error.message);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  logError('Unhandled Rejection', error.message);
});

// Start the bot
const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error('❌ ERROR: DISCORD_BOT_TOKEN not found in .env file!');
  console.log('\n📝 Please create a .env file with your bot token:');
  console.log('DISCORD_BOT_TOKEN=your_token_here\n');
  process.exit(1);
}

// Start dashboard server
startDashboard();

// Login to Discord
client.login(token).catch((error) => {
  console.error('❌ Failed to login to Discord:', error);
  console.log('\n🔍 Make sure your DISCORD_BOT_TOKEN is correct!');
  process.exit(1);
});

