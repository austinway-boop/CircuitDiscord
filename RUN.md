# 🚀 How to Run Circuit Bot

This bot is a **traditional Discord bot** that shows as **ONLINE** (green status) in Discord!

## ⚡ Quick Start (Local)

### 1. Get Your Bot Token

1. Go to https://discord.com/developers/applications/1444014145438486589/bot
2. Click "Reset Token" (or "Copy" if visible)
3. **Save this token!**

### 2. Create .env File

Create a file named `.env` in the project root:

```env
DISCORD_BOT_TOKEN=paste_your_token_here
DISCORD_APPLICATION_ID=1444014145438486589
DASHBOARD_PORT=3000
ADMIN_PASSWORD=circuitbot123
```

### 3. Install & Run

```bash
npm install
npm run register
npm start
```

That's it! Bot will be **ONLINE** in Discord! ✅

### 4. Access Dashboard

Open your browser: `http://localhost:3000`

---

## ☁️ Deploy to Railway (Free, 24/7 Hosting)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `austinway-boop/CircuitDiscord`
4. Click "Add variables" and add:

```
DISCORD_BOT_TOKEN = your_token_here
DISCORD_APPLICATION_ID = 1444014145438486589
DASHBOARD_PORT = 3000
ADMIN_PASSWORD = your_password_here
```

5. Click "Deploy"

### Step 3: Register Commands

In Railway dashboard:
1. Go to your project
2. Click "Settings" → "Environment"
3. The bot will auto-start

Or locally run once:
```bash
npm run register
```

### Step 4: Access Your Dashboard

Railway will give you a public URL like:
```
https://your-app.up.railway.app
```

Your bot is now **ONLINE 24/7**! 🎉

---

## 🖥️ Deploy to a VPS

### For Ubuntu/Debian:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/austinway-boop/CircuitDiscord.git
cd CircuitDiscord
npm install

# Create .env file
nano .env
# Add your configuration (see above)

# Register commands
npm run register

# Install PM2 to keep bot running
sudo npm install -g pm2

# Start bot with PM2
pm2 start src/index.js --name circuit-bot
pm2 save
pm2 startup
# Follow the command PM2 gives you

# View logs
pm2 logs circuit-bot
```

Your bot is now running 24/7 on your VPS!

---

## 📊 What You Should See

### When Bot Starts:

```
╔════════════════════════════════════════╗
║     ⚡ CIRCUIT BOT IS ONLINE! ⚡      ║
╚════════════════════════════════════════╝

🤖 Logged in as: Circuit Bot#1234
📊 Servers: 1
👥 Users: 10

🌐 Dashboard: http://localhost:3000

✅ Bot is ready to receive commands!
```

### In Discord:

- Bot shows **ONLINE** with green dot ✅
- Can use `/ping`, `/hello`, `/info`, `/help`, `/stats`
- Bot responds instantly

### Dashboard (http://localhost:3000):

- See bot status
- View command logs
- Monitor errors
- Enable/disable bot
- View statistics

---

## 🔧 Commands Reference

### Development Commands

```bash
npm start          # Start the bot
npm run dev        # Start with auto-reload
npm run register   # Register slash commands
npm run dashboard  # Start dashboard only
```

### PM2 Commands (VPS)

```bash
pm2 start src/index.js --name circuit-bot  # Start
pm2 stop circuit-bot                       # Stop
pm2 restart circuit-bot                    # Restart
pm2 logs circuit-bot                       # View logs
pm2 delete circuit-bot                     # Remove
```

---

## ❓ FAQ

### Why does bot show offline?
**It shouldn't!** This bot shows as ONLINE. If it's offline:
- Bot isn't running (`npm start`)
- Invalid bot token
- Bot not invited to server

### How do I keep it running 24/7?
**Options:**
1. **Railway** - Free hosting (recommended)
2. **VPS with PM2** - Keeps bot alive
3. **Heroku** - Free tier available
4. **Local PC** - Only online when PC is on

### Can I use Vercel?
**No.** Vercel is serverless and can't maintain WebSocket connections. Bot would show offline.

Use Railway, Heroku, or a VPS instead.

### How much does hosting cost?
- **Railway:** Free tier (500 hours/month)
- **Heroku:** Free tier available
- **VPS:** $5-10/month (DigitalOcean, Linode)
- **Local:** Free (but only runs when PC is on)

### How do I update the bot?
```bash
git pull
npm install
npm start
```

Or with PM2:
```bash
git pull
npm install
pm2 restart circuit-bot
```

Railway auto-deploys on git push!

### Dashboard can't be accessed
- Check if bot is running
- Verify `DASHBOARD_PORT` in .env
- For VPS: Allow port in firewall
- For Railway: Use the public URL they provide

---

## 🎯 Next Steps

1. ✅ Get bot online
2. ✅ Test commands in Discord
3. ✅ Access dashboard
4. 🚀 Deploy to Railway for 24/7 uptime
5. 🎨 Customize commands (see README.md)

---

## 📚 More Documentation

- **README.md** - Full documentation
- **DASHBOARD.md** - Dashboard guide
- **ADDING_COMMANDS.md** - Add custom commands

---

**Need help?** Open an issue on GitHub!

**Bot working?** Give it a ⭐ on GitHub!

🎉 **Enjoy your always-online Discord bot!** 🎉

