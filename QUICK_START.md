# 🚀 Quick Start Guide - Circuit Discord Bot

Your Discord bot is now on GitHub and ready to deploy to Vercel!

**Repository**: https://github.com/austinway-boop/CircuitDiscord.git

## ⚡ Next Steps (5 minutes to deployment!)

### 1️⃣ Get Your Bot Token (1 min)

1. Visit: https://discord.com/developers/applications/1444014145438486589/bot
2. Under "TOKEN" section, click "Reset Token" (or "Copy" if visible)
3. **SAVE THIS TOKEN** - You'll need it later!

### 2️⃣ Deploy to Vercel (2 mins)

1. Go to **https://vercel.com** and sign in (use GitHub to sign in for easier integration)
2. Click **"Add New Project"**
3. Import your repository: **austinway-boop/CircuitDiscord**
4. In **Environment Variables**, add these 4 variables:

```
DISCORD_PUBLIC_KEY = f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0
DISCORD_APPLICATION_ID = 1444014145438486589
DISCORD_CLIENT_ID = 1444014145438486589
DISCORD_CLIENT_SECRET = JgrqlkQuBlBNk1QcvthyIXDgCTeuOTea
```

5. Click **"Deploy"** and wait ~1 minute

### 3️⃣ Configure Discord (1 min)

After deployment:

1. Copy your Vercel URL (e.g., `https://circuit-discord.vercel.app`)
2. Go to: https://discord.com/developers/applications/1444014145438486589/information
3. Scroll to **"Interactions Endpoint URL"**
4. Enter: `https://YOUR-VERCEL-URL.vercel.app/api/interactions`
5. Click **"Save Changes"** (Discord will verify automatically ✅)

### 4️⃣ Register Commands (1 min)

Open your terminal and run:

```bash
cd C:\Users\austi\OneDrive\Desktop\CircuitDiscordBot
npm install
```

Create a `.env` file with your bot token:
```
DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN_FROM_STEP_1
```

Then register the commands:
```bash
node scripts/register-commands.js
```

### 5️⃣ Invite Bot to Your Server

Click this link (or copy and paste it):

**https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=2048&scope=bot%20applications.commands**

Select your server and click "Authorize"!

### 6️⃣ Test It!

In your Discord server, try these commands:

- `/ping` - Should respond with "🏓 Pong!"
- `/hello` - Should greet you
- `/info` - Should show bot information

---

## 📚 What's Included?

✅ Serverless Discord bot running on Vercel  
✅ Slash command support  
✅ Three example commands (ping, hello, info)  
✅ Easy deployment and updates  
✅ Automatic scaling with Vercel  
✅ Detailed documentation  

## 📖 Documentation Files

- **README.md** - Overview and main documentation
- **DEPLOYMENT.md** - Detailed deployment instructions
- **ADDING_COMMANDS.md** - How to add custom commands
- **QUICK_START.md** - This file!

## 🛠️ Key Files

- `api/interactions.js` - Main bot logic and command handlers
- `scripts/register-commands.js` - Script to register slash commands
- `vercel.json` - Vercel configuration
- `package.json` - Dependencies

## 💡 Tips

- **Update the bot**: Just `git push` - Vercel auto-deploys!
- **Add commands**: See `ADDING_COMMANDS.md`
- **View logs**: Go to Vercel Dashboard → Your Project → Functions
- **Need help?**: Check `README.md` for troubleshooting

## 🔐 Security Note

Your credentials are already configured in the project files (gitignored):
- Client ID: `1444014145438486589`
- Public Key: `f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0`
- These are set in environment variables on Vercel

**Never commit your Bot Token to GitHub!** (It's in `.gitignore`)

---

## ⚠️ Troubleshooting

**"Interaction failed"**
- Check that environment variables are set in Vercel
- Verify the interactions endpoint URL is correct

**Commands not showing**
- Wait 5-10 minutes for Discord to sync
- Re-run `node scripts/register-commands.js`
- Try `/` in Discord to refresh command list

**"Invalid request signature"**
- Double-check PUBLIC_KEY in Vercel environment variables
- Make sure there are no extra spaces

---

## 🎉 You're All Set!

Your Circuit Bot is ready to go. Start by deploying to Vercel and inviting it to your server!

Need to add more features? Check out `ADDING_COMMANDS.md` for examples!

**Happy coding! ⚡**

