const { verifyKey } = require('discord-interactions');

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

module.exports = async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = JSON.stringify(req.body);

  const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);

  if (!isValidRequest) {
    console.error('Invalid request signature');
    return res.status(401).json({ error: 'Invalid request signature' });
  }

  const interaction = req.body;

  // Handle Discord PING
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Handle slash commands
  if (interaction.type === 2) {
    const { name } = interaction.data;

    switch (name) {
      case 'ping':
        return res.status(200).json({
          type: 4,
          data: {
            content: '🏓 Pong! Circuit Bot is responding!\n⚡ Hosted on Vercel (serverless)'
          }
        });

      case 'hello':
        return res.status(200).json({
          type: 4,
          data: {
            content: `👋 Hello, <@${interaction.member.user.id}>! Welcome to Circuit Bot!\n\n⚡ I'm serverless on Vercel - I respond instantly to commands even though I show as offline!`
          }
        });

      case 'info':
        return res.status(200).json({
          type: 4,
          data: {
            embeds: [{
              title: '⚡ Circuit Bot Information',
              description: '**Serverless Discord bot running on Vercel!**\n\n💡 **Note:** I appear offline because I use Discord\'s Interaction API (serverless). I respond instantly to slash commands!',
              color: 0x00D9FF,
              fields: [
                {
                  name: '🤖 Status',
                  value: '✅ **ONLINE & READY**',
                  inline: true
                },
                {
                  name: '📦 Version',
                  value: 'v2.1.0',
                  inline: true
                },
                {
                  name: '⚙️ Platform',
                  value: 'Vercel Serverless',
                  inline: true
                },
                {
                  name: '⚡ Response',
                  value: '< 100ms',
                  inline: true
                },
                {
                  name: '🌍 Uptime',
                  value: '24/7',
                  inline: true
                },
                {
                  name: '📊 Architecture',
                  value: 'HTTP Endpoints',
                  inline: true
                },
                {
                  name: '📝 Commands',
                  value: '`/ping` - Test\n`/hello` - Greet\n`/info` - This info\n`/help` - Help',
                  inline: false
                }
              ],
              footer: {
                text: 'Circuit Bot • Powered by Vercel'
              },
              timestamp: new Date().toISOString()
            }]
          }
        });

      case 'help':
        return res.status(200).json({
          type: 4,
          data: {
            embeds: [{
              title: '📚 Circuit Bot - Command Help',
              description: 'All available commands:',
              color: 0x5865F2,
              fields: [
                {
                  name: '🏓 `/ping`',
                  value: 'Check if bot is responding',
                  inline: false
                },
                {
                  name: '👋 `/hello`',
                  value: 'Get a friendly greeting',
                  inline: false
                },
                {
                  name: '⚡ `/info`',
                  value: 'View bot information',
                  inline: false
                },
                {
                  name: '📚 `/help`',
                  value: 'Show this help message',
                  inline: false
                },
                {
                  name: '\u200B',
                  value: '**💡 Why offline status?**\nI\'m serverless on Vercel! I use HTTP endpoints instead of WebSocket. This means:\n✅ Instant responses\n✅ 100% uptime\n✅ Zero costs\n⚠️ Shows as "offline" (cosmetic only)',
                  inline: false
                }
              ],
              footer: {
                text: 'Circuit Bot runs 24/7 on Vercel!'
              },
              timestamp: new Date().toISOString()
            }]
          }
        });

      default:
        return res.status(200).json({
          type: 4,
          data: {
            content: '❌ Unknown command! Use `/help` to see available commands.',
            flags: 64
          }
        });
    }
  }

  return res.status(400).json({ error: 'Unknown interaction type' });
}

