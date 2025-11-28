import { verifyKey } from 'discord-interactions';

// Environment variables
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

/**
 * Main handler for Discord interactions
 */
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if bot is enabled (from dashboard)
  if (global.botEnabled && !global.botEnabled()) {
    // Log the blocked interaction
    if (global.logError) {
      global.logError('Bot is disabled', 'Interaction blocked by dashboard');
    }
    return res.status(200).json({
      type: 4,
      data: {
        content: '⏸️ Bot is currently disabled by the administrator. Please try again later.',
        flags: 64 // Ephemeral message
      }
    });
  }

  // Verify the request is from Discord
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = JSON.stringify(req.body);

  const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);

  if (!isValidRequest) {
    console.error('Invalid request signature');
    if (global.logError) {
      global.logError('Invalid request signature', `Headers: ${JSON.stringify(req.headers)}`);
    }
    return res.status(401).json({ error: 'Invalid request signature' });
  }

  const interaction = req.body;
  
  // Log the interaction
  try {
    if (global.logInteraction && interaction.type === 2) {
      const userName = interaction.member?.user?.username || interaction.user?.username || 'Unknown';
      const commandName = interaction.data?.name || 'unknown';
      global.logInteraction('COMMAND', commandName, userName);
    }
  } catch (err) {
    console.error('Error logging interaction:', err);
  }

  // Handle Discord PING
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Handle APPLICATION_COMMAND interactions
  if (interaction.type === 2) {
    const { name } = interaction.data;

    // Handle different commands
    switch (name) {
      case 'ping':
        return res.status(200).json({
          type: 4,
          data: {
            content: '🏓 Pong! Circuit Bot is online!'
          }
        });

      case 'hello':
        return res.status(200).json({
          type: 4,
          data: {
            content: `👋 Hello, <@${interaction.member.user.id}>! Welcome to Circuit Bot!\n\n⚡ I'm a serverless bot running on Vercel. Even though I appear offline, I'm always ready to respond to your commands!\n\nTry \`/info\` to learn more about me!`
          }
        });

      case 'help':
        return res.status(200).json({
          type: 4,
          data: {
            embeds: [{
              title: '📚 Circuit Bot - Command Help',
              description: 'Here are all available commands:',
              color: 0x5865F2,
              fields: [
                {
                  name: '🏓 `/ping`',
                  value: 'Check if the bot is responding',
                  inline: false
                },
                {
                  name: '👋 `/hello`',
                  value: 'Get a friendly greeting from Circuit Bot',
                  inline: false
                },
                {
                  name: '⚡ `/info`',
                  value: 'View detailed information about the bot',
                  inline: false
                },
                {
                  name: '📚 `/help`',
                  value: 'Display this help message',
                  inline: false
                },
                {
                  name: '\u200B',
                  value: '**💡 Why does the bot show as offline?**\nCircuit Bot is serverless! It uses Discord\'s Interaction API instead of maintaining a constant connection. This means:\n✅ Instant responses to commands\n✅ 100% uptime\n✅ No server costs\n⚡ Zero latency\n\nThe bot is **always online** and ready, even if Discord shows it as offline!',
                  inline: false
                }
              ],
              footer: {
                text: 'Need more help? Check the GitHub repository!'
              },
              timestamp: new Date().toISOString()
            }]
          }
        });

      case 'info':
        return res.status(200).json({
          type: 4,
          data: {
            embeds: [{
              title: '⚡ Circuit Bot Information',
              description: '**A serverless Discord bot running on Vercel!**\n\n💡 **Note:** This bot appears offline because it uses Discord\'s interaction endpoints (serverless). It responds instantly to slash commands even though the status shows offline!',
              color: 0x00D9FF,
              fields: [
                {
                  name: '🤖 Bot Status',
                  value: '✅ **ONLINE & READY**',
                  inline: true
                },
                {
                  name: '📦 Version',
                  value: 'v1.1.0',
                  inline: true
                },
                {
                  name: '⚙️ Platform',
                  value: 'Vercel Serverless',
                  inline: true
                },
                {
                  name: '⚡ Response Time',
                  value: '< 100ms',
                  inline: true
                },
                {
                  name: '🌍 Availability',
                  value: '24/7 Uptime',
                  inline: true
                },
                {
                  name: '📊 Architecture',
                  value: 'Interaction API',
                  inline: true
                },
                {
                  name: '📝 Available Commands',
                  value: '`/ping` - Test bot response\n`/hello` - Get a greeting\n`/info` - View this info\n`/help` - Get help',
                  inline: false
                },
                {
                  name: '🔗 Links',
                  value: '[GitHub](https://github.com/austinway-boop/CircuitDiscord) • [Vercel](https://vercel.com)',
                  inline: false
                }
              ],
              thumbnail: {
                url: 'https://cdn.discordapp.com/embed/avatars/0.png'
              },
              footer: {
                text: 'Circuit Bot • Powered by Vercel'
              },
              timestamp: new Date().toISOString()
            }]
          }
        });

      default:
        if (global.logError) {
          global.logError('Unknown command', `Command: ${name}`);
        }
        return res.status(200).json({
          type: 4,
          data: {
            content: '❌ Unknown command'
          }
        });
    }
  }

  // Handle other interaction types (buttons, modals, etc.)
  if (global.logError) {
    global.logError('Unknown interaction type', `Type: ${interaction.type}`);
  }
  return res.status(400).json({ error: 'Unknown interaction type' });
}

