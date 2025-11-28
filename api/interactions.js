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

  // Verify the request is from Discord
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
            content: `👋 Hello, <@${interaction.member.user.id}>! Welcome to Circuit Bot!`
          }
        });

      case 'info':
        return res.status(200).json({
          type: 4,
          data: {
            embeds: [{
              title: '⚡ Circuit Bot Information',
              description: 'A serverless Discord bot running on Vercel!',
              color: 0x5865F2,
              fields: [
                {
                  name: 'Version',
                  value: '1.0.0',
                  inline: true
                },
                {
                  name: 'Platform',
                  value: 'Vercel',
                  inline: true
                },
                {
                  name: 'Status',
                  value: '✅ Online',
                  inline: true
                }
              ],
              footer: {
                text: 'Circuit Bot'
              },
              timestamp: new Date().toISOString()
            }]
          }
        });

      default:
        return res.status(200).json({
          type: 4,
          data: {
            content: '❌ Unknown command'
          }
        });
    }
  }

  // Handle other interaction types (buttons, modals, etc.)
  return res.status(400).json({ error: 'Unknown interaction type' });
}

