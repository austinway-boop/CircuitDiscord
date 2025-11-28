# ⚡ Circuit Bot - Always Online with Admin Dashboard

A traditional Discord bot that shows as **ONLINE** with a web admin panel!

## 🚀 Deploy to Railway (Free & Easy)

### Step 1: Get Bot Token

1. Go to https://discord.com/developers/applications/1444014145438486589/bot
2. Copy your bot token

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub"
3. Select `austinway-boop/CircuitDiscord`
4. Add environment variables:
   - `DISCORD_BOT_TOKEN` = your_token
   - `DISCORD_APPLICATION_ID` = 1444014145438486589
   - `PORT` = 3000
   - `ADMIN_PASSWORD` = your_password
5. Deploy!

Railway will give you a public URL for your dashboard!

### Step 3: Register Commands

On your computer:
```bash
npm install
npm run register
```

### Step 4: Invite Bot

https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=8&scope=bot%20applications.commands

## ✨ Features

- ✅ **Shows as ONLINE** in Discord
- 🎛️ **Admin Dashboard** - view stats, logs, control bot
- 📊 **Real-time monitoring** - see all commands used
- ⚠️ **Error tracking** - monitor issues
- ⏸️ **Remote control** - enable/disable bot from dashboard

## 🌐 Dashboard

Access at: `https://your-railway-url.up.railway.app`

- View bot status
- See command logs
- Monitor errors
- Enable/disable bot
- Clear logs

Default password: `circuitbot123`

## 📝 Commands

- `/ping` - Check latency
- `/hello` - Get greeting
- `/info` - Bot information
- `/help` - Show commands

## 🏠 Run Locally

```bash
# Create .env file
DISCORD_BOT_TOKEN=your_token
DISCORD_APPLICATION_ID=1444014145438486589
PORT=3000
ADMIN_PASSWORD=circuitbot123

# Install & run
npm install
npm run register
npm start
```

Dashboard at: http://localhost:3000

## 🎯 This is NOT serverless!

This bot:
- ✅ Maintains persistent connection
- ✅ Shows as ONLINE (green status)
- ✅ Has admin dashboard
- ✅ Runs 24/7

**Deploy to Railway, NOT Vercel!**
