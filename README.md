# ⚡ Circuit Discord Bot

A fully-featured Discord bot that shows **ONLINE** with a web dashboard for monitoring and control!

## 🌟 Features

- ✅ **Always Online** - Traditional bot that shows green status in Discord
- 🎛️ **Web Dashboard** - Monitor and control your bot from a browser
- 📊 **Real-time Logging** - Track all commands and errors
- ⚡ **Fast Response** - Low latency, instant command execution
- 🔐 **Admin Controls** - Enable/disable bot remotely
- 📈 **Statistics** - View uptime, usage stats, and more

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Bot

Create a `.env` file:

```env
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_APPLICATION_ID=1444014145438486589
DASHBOARD_PORT=3000
ADMIN_PASSWORD=circuitbot123
```

**Get your bot token:**
1. Go to https://discord.com/developers/applications/1444014145438486589/bot
2. Click "Reset Token" or "Copy"
3. Paste it in `.env` file

### 3. Register Commands

```bash
npm run register
```

### 4. Start the Bot

```bash
npm start
```

The bot will:
- ✅ Connect to Discord (show as **ONLINE**)
- ✅ Start web dashboard at `http://localhost:3000`
- ✅ Be ready to receive commands!

### 5. Invite Bot to Your Server

Use this link:
```
https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=8&scope=bot%20applications.commands
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check bot latency and response time |
| `/hello` | Get a friendly greeting |
| `/info` | View detailed bot information |
| `/help` | Display all available commands |
| `/stats` | View bot statistics and uptime |

## 🎛️ Web Dashboard

Access the dashboard at `http://localhost:3000` (or your server IP)

**Features:**
- 📊 Real-time statistics
- 📝 Command logs
- ⚠️ Error logs
- ⏸️ Enable/Disable bot
- 🗑️ Clear logs
- 🔄 Auto-refresh

**Default Password:** `circuitbot123` (change in `.env`)

## 🖥️ Hosting Options

### Option 1: Run Locally (Free)

Just run `npm start` on your computer. Bot stays online as long as your computer is on.

### Option 2: Railway (Recommended, Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables:
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_APPLICATION_ID`
   - `DASHBOARD_PORT=3000`
   - `ADMIN_PASSWORD`
5. Deploy!

Railway will:
- Keep your bot online 24/7
- Provide a public URL for dashboard
- Auto-deploy on git push

### Option 3: VPS (DigitalOcean, Linode, etc.)

```bash
# On your server
git clone https://github.com/austinway-boop/CircuitDiscord.git
cd CircuitDiscord
npm install
npm run register
npm start
```

Use PM2 to keep it running:
```bash
npm install -g pm2
pm2 start src/index.js --name circuit-bot
pm2 save
pm2 startup
```

### Option 4: Heroku

1. Create a `Procfile`:
```
worker: node src/index.js
```

2. Deploy:
```bash
heroku create your-bot-name
git push heroku main
heroku ps:scale worker=1
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_BOT_TOKEN` | ✅ Yes | - | Your Discord bot token |
| `DISCORD_APPLICATION_ID` | ✅ Yes | - | Your application ID |
| `DASHBOARD_PORT` | ❌ No | 3000 | Web dashboard port |
| `ADMIN_PASSWORD` | ❌ No | circuitbot123 | Dashboard admin password |

### Bot Intents

The bot uses these intents:
- `Guilds` - Access server information
- `GuildMessages` - Read messages (for future features)
- `MessageContent` - Access message content

## 📊 Dashboard API

### Toggle Bot Status
```bash
POST /api/toggle
Content-Type: application/json

{
  "password": "your_password"
}
```

### Clear Logs
```bash
POST /api/clear-logs
Content-Type: application/json

{
  "password": "your_password"
}
```

## 🐛 Troubleshooting

### Bot shows as offline
- Check that `DISCORD_BOT_TOKEN` is correct
- Make sure the bot is running (`npm start`)
- Check console for error messages

### Commands not appearing
- Run `npm run register` to register commands
- Wait 5-10 minutes for Discord to sync
- Try kicking and re-inviting the bot

### Dashboard not accessible
- Check `DASHBOARD_PORT` in `.env`
- Make sure port is not in use
- Check firewall settings

### "Invalid Token" error
- Get a new token from Discord Developer Portal
- Make sure token is in `.env` file
- No spaces or quotes around the token

## 📈 Adding Custom Commands

1. **Edit `src/index.js`** - Add command handler:
```javascript
case 'yourcommand':
  await interaction.reply({
    content: 'Your response here!'
  });
  break;
```

2. **Edit `src/register-commands.js`** - Register command:
```javascript
{
  name: 'yourcommand',
  description: 'Description of your command',
}
```

3. **Re-register commands:**
```bash
npm run register
```

4. **Restart bot:**
```bash
npm start
```

## 🔐 Security

- ⚠️ **NEVER** commit `.env` file to GitHub
- ⚠️ Change default admin password
- ⚠️ Use strong bot token (keep it secret)
- ⚠️ Restrict dashboard access with firewall

## 📚 Project Structure

```
CircuitDiscordBot/
├── src/
│   ├── index.js              # Main bot file
│   ├── dashboard.js          # Web dashboard
│   └── register-commands.js  # Command registration
├── package.json              # Dependencies
├── .env                      # Configuration (not committed)
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Feel free to use and modify!

## 🎉 Credits

- Built with [discord.js](https://discord.js.org/)
- Dashboard powered by Express
- Hosted on Railway/Heroku/VPS

---

**🌟 Your bot is now ONLINE and ready to serve! 🌟**

For help, check the [DASHBOARD.md](DASHBOARD.md) file or open an issue on GitHub!
