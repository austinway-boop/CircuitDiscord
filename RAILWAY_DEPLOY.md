# 🚂 Deploy to Railway - ALWAYS ONLINE Bot with Admin Panel!

## Why Railway Instead of Vercel?

❌ **Vercel** = Serverless only, bot shows OFFLINE  
✅ **Railway** = Persistent process, bot shows ONLINE 24/7 with admin dashboard!

---

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `austinway-boop/CircuitDiscord`
5. Railway will automatically detect it's a Node.js app!

### Step 3: Add Environment Variables

In Railway dashboard, go to your project → **Variables** tab and add:

```
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_APPLICATION_ID=1444014145438486589
DISCORD_CLIENT_ID=1444014145438486589
DISCORD_CLIENT_SECRET=JgrqlkQuBlBNk1QcvthyIXDgCTeuOTea
PORT=3000
ADMIN_PASSWORD=circuitbot123
```

**Get your bot token:**
- Go to https://discord.com/developers/applications/1444014145438486589/bot
- Click "Reset Token" or "Copy"
- Paste it as `DISCORD_BOT_TOKEN`

### Step 4: Deploy!

Railway will automatically:
- Install dependencies
- Start your bot
- Keep it running 24/7
- Provide a public URL for your admin dashboard!

### Step 5: Register Commands

On your local computer:

```bash
# Create .env file
echo DISCORD_BOT_TOKEN=your_token > .env
echo DISCORD_APPLICATION_ID=1444014145438486589 >> .env

# Register commands
npm install
node register-commands.js
```

### Step 6: Invite Bot & Test

**Invite bot to server:**
```
https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=8&scope=bot%20applications.commands
```

**Test in Discord:**
- `/ping` - Bot responds ✅
- `/hello` - Get greeting ✅
- `/info` - Bot information ✅
- `/help` - View commands ✅
- `/stats` - View statistics ✅

**Bot will show ONLINE!** 🟢

---

## 🎛️ Access Your Admin Dashboard

Railway will give you a public URL like:
```
https://your-app.up.railway.app
```

Open that URL in your browser to access your admin dashboard!

**Dashboard Features:**
- ✅ See bot online status
- ✅ View command logs
- ✅ See error logs
- ✅ Enable/Disable bot
- ✅ Clear logs
- ✅ View statistics
- ✅ Real-time updates

**Default password:** `circuitbot123` (change in environment variables!)

---

## 📊 What You Get

### With Railway:
- ✅ Bot shows **ONLINE** in Discord (green status!)
- ✅ **Admin dashboard** with full controls
- ✅ 24/7 uptime
- ✅ Auto-restarts if crashes
- ✅ Public dashboard URL
- ✅ $5/month free credit
- ✅ Auto-deploy on git push

### With Vercel (what you tried):
- ⚠️ Bot shows **OFFLINE** always
- ❌ No admin dashboard
- ❌ Can't maintain WebSocket connection
- ❌ Serverless only

---

## 💰 Cost

**Railway Free Tier:**
- $5 credit per month (enough for one bot 24/7!)
- No credit card required initially
- Can upgrade if needed

**This bot uses minimal resources, so $5/month credit is plenty!**

---

## 🔧 Monitoring Your Bot

### View Logs in Railway:
1. Go to your project in Railway
2. Click on your service
3. Click **"Deployments"** → Latest deployment
4. Click **"View Logs"** to see real-time bot logs

### Access Dashboard:
- Go to your Railway public URL
- Enter admin password
- See everything in real-time!

---

## 🔄 Updating Your Bot

When you make code changes:

```bash
git add .
git commit -m "Updated bot"
git push
```

Railway automatically redeploys! No manual steps needed.

---

## ⚙️ Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `DISCORD_BOT_TOKEN` | ✅ Yes | `MTQ0N...` | Your Discord bot token |
| `DISCORD_APPLICATION_ID` | ✅ Yes | `1444014145438486589` | Application ID |
| `DISCORD_CLIENT_ID` | ✅ Yes | `1444014145438486589` | Client ID |
| `DISCORD_CLIENT_SECRET` | ✅ Yes | `JgrqlkQ...` | Client secret |
| `PORT` | ❌ No | `3000` | Dashboard port (default: 3000) |
| `ADMIN_PASSWORD` | ❌ No | `your_password` | Dashboard password |

---

## 🐛 Troubleshooting

### Bot not connecting
- Check `DISCORD_BOT_TOKEN` is correct
- View logs in Railway dashboard
- Make sure bot token is valid

### Commands not appearing
- Run `node register-commands.js` locally
- Wait 5-10 minutes
- Reinvite bot to server

### Dashboard not accessible
- Check Railway gave you a public URL
- Make sure deployment is "Active"
- Check logs for errors

### Bot shows offline
- Check Railway deployment is running
- View logs for connection errors
- Verify bot token is correct

---

## 🎉 Success!

Once deployed on Railway:
- ✅ Bot is **ONLINE** in Discord
- ✅ Admin dashboard accessible
- ✅ Running 24/7
- ✅ Auto-restarts
- ✅ Public URL for dashboard

**No more Vercel 404 errors!**  
**No more offline status!**  
**Full admin control!**

---

## 📚 Next Steps

1. Deploy to Railway (follow steps above)
2. Get your bot online
3. Access admin dashboard
4. Customize commands (see ADDING_COMMANDS.md)
5. Enjoy your always-online bot! 🎉

---

**Need help?** Check Railway logs or open an issue!

**Bot working?** Give it a ⭐ on GitHub!

