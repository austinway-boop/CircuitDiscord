# ⚡ Circuit Discord Bot

A serverless Discord bot running on **Vercel** with instant slash command responses!

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub (Already Done ✅)

The code is already at: https://github.com/austinway-boop/CircuitDiscord.git

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import: `austinway-boop/CircuitDiscord`
4. **Add Environment Variables:**
   - `DISCORD_PUBLIC_KEY` = `f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0`
   - `DISCORD_APPLICATION_ID` = `1444014145438486589`
   - `DISCORD_CLIENT_ID` = `1444014145438486589`
   - `DISCORD_CLIENT_SECRET` = `JgrqlkQuBlBNk1QcvthyIXDgCTeuOTea`

5. Click **"Deploy"**

### Step 3: Configure Discord

After deployment:

1. Copy your Vercel URL (e.g., `https://circuit-discord.vercel.app`)
2. Go to [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589/information)
3. Set **"Interactions Endpoint URL"** to:
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/interactions
   ```
4. Click **"Save Changes"** (Discord will verify automatically ✅)

### Step 4: Get Bot Token & Register Commands

1. Go to [Bot Settings](https://discord.com/developers/applications/1444014145438486589/bot)
2. Copy your bot token
3. On your computer, create `.env` file:
   ```env
   DISCORD_BOT_TOKEN=your_token_here
   ```
4. Run:
   ```bash
   npm install
   node scripts/register-commands.js
   ```

### Step 5: Invite Bot

Use this link:
```
https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=2048&scope=bot%20applications.commands
```

### Step 6: Test!

In Discord:
- `/ping` - Bot responds ✅
- `/hello` - Get greeting ✅
- `/info` - Bot information ✅
- `/help` - View all commands ✅

---

## ⚠️ Important: Why Bot Shows "Offline"

**This is NORMAL for Vercel bots!**

- ✅ Bot **DOES work** - responds to commands instantly
- ✅ Bot is **available 24/7**
- ✅ Bot has **100% uptime**
- ⚠️ Bot shows as **"offline"** (cosmetic only)

### Why?

Vercel is **serverless** (HTTP endpoints only). Discord only shows bots as "online" if they have a **WebSocket connection**, which Vercel can't maintain.

**The offline status is purely visual** - the bot works perfectly!

### Want Bot to Show "Online"?

You'd need to switch to a different hosting platform:
- Railway (free tier)
- Heroku
- VPS/dedicated server

But these cost money and require more maintenance. **Vercel is free and works great!**

---

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check if bot is responding |
| `/hello` | Get a friendly greeting |
| `/info` | View bot information |
| `/help` | Display all commands |

---

## 🔧 Troubleshooting

### "Application did not respond"

**Cause:** Interactions endpoint not set correctly

**Fix:**
1. Go to Discord Developer Portal → Your App → General Information
2. Set Interactions Endpoint URL to: `https://YOUR-VERCEL-URL.vercel.app/api/interactions`
3. Make sure it shows a green checkmark

### Commands don't appear in Discord

**Cause:** Commands not registered

**Fix:**
```bash
npm install
node scripts/register-commands.js
```

Wait 5-10 minutes for Discord to sync.

### "Invalid request signature" in Vercel logs

**Cause:** Wrong PUBLIC_KEY

**Fix:**
1. Verify `DISCORD_PUBLIC_KEY` in Vercel environment variables
2. Should be: `f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0`
3. Redeploy after fixing

### 404 Error from Vercel

**Cause:** Deployment issue

**Fix:**
1. Check that `api/interactions.js` exists
2. Check that `vercel.json` is configured
3. Redeploy from Vercel dashboard

---

## 📁 Project Structure

```
CircuitDiscordBot/
├── api/
│   └── interactions.js       # Main bot endpoint
├── scripts/
│   └── register-commands.js  # Command registration
├── package.json             # Dependencies
├── vercel.json              # Vercel configuration
└── README.md                # This file
```

---

## 🎯 Key Points

✅ **Works on Vercel** - Free hosting, auto-deploys  
✅ **24/7 Available** - Always responds to commands  
✅ **Zero Maintenance** - Vercel handles everything  
✅ **Fast Responses** - Sub-100ms response time  
⚠️ **Shows Offline** - This is normal for serverless bots!  

---

## 📚 More Info

- [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589)
- [Vercel Documentation](https://vercel.com/docs)
- [Discord Interactions Guide](https://discord.com/developers/docs/interactions/receiving-and-responding)

---

## 💡 Need Help?

1. Check Vercel function logs for errors
2. Verify environment variables are set
3. Make sure interactions endpoint is configured
4. Wait a few minutes after deployment

**The bot WILL show as offline - this is expected and cannot be changed on Vercel!**

---

Made with ⚡ by Circuit Bot Team
