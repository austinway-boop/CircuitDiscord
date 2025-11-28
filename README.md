# Circuit Discord Bot

A serverless Discord bot powered by Vercel that uses Discord's interaction endpoints.

## 🚀 Features

- Serverless architecture running on Vercel
- Slash command support
- Easy to deploy and maintain
- No need for 24/7 server uptime

## 📋 Prerequisites

- Discord Developer Account
- Vercel Account
- Node.js installed locally (for testing)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application (Application ID: 1444014145438486589)
3. Go to the "Bot" section
4. Copy your bot token
5. Update `.env` file with your bot token

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in project settings:
   - `DISCORD_PUBLIC_KEY`
   - `DISCORD_APPLICATION_ID`
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
4. Deploy!

### 4. Configure Discord Interactions Endpoint

1. After deploying, copy your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Go to [Discord Developer Portal](https://discord.com/developers/applications)
3. Select your application
4. Go to "General Information"
5. Set the "Interactions Endpoint URL" to: `https://your-project.vercel.app/api/interactions`
6. Click "Save Changes"

Discord will verify your endpoint automatically.

### 5. Register Slash Commands

```bash
# Make sure DISCORD_BOT_TOKEN is set in your .env file
node scripts/register-commands.js
```

### 6. Invite Bot to Your Server

Use this URL format (replace APPLICATION_ID with yours):

```
https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=2048&scope=bot%20applications.commands
```

## 📝 Available Commands

- `/ping` - Check if the bot is responding
- `/hello` - Get a friendly greeting
- `/info` - Get information about the bot

## 🔧 Adding New Commands

1. Add the command definition in `scripts/register-commands.js`
2. Add the command handler in `api/interactions.js`
3. Run the register script: `node scripts/register-commands.js`

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `DISCORD_PUBLIC_KEY` | Your application's public key |
| `DISCORD_APPLICATION_ID` | Your application ID |
| `DISCORD_CLIENT_ID` | Your client ID |
| `DISCORD_CLIENT_SECRET` | Your client secret |
| `DISCORD_BOT_TOKEN` | Your bot token (needed for registering commands) |

## 📚 Resources

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord Interactions Guide](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Vercel Documentation](https://vercel.com/docs)

## 🐛 Troubleshooting

### Bot not responding to commands
- Make sure the interactions endpoint URL is correctly set in Discord Developer Portal
- Check Vercel function logs for errors
- Verify environment variables are set correctly

### Commands not showing up
- Run the register-commands script again
- Wait a few minutes for Discord to propagate the commands
- Check if your bot token is valid

### Verification failed error
- Ensure your PUBLIC_KEY is correct in environment variables
- Check that the endpoint URL matches your Vercel deployment

## 📄 License

MIT

---

Made with ⚡ by Circuit Bot

