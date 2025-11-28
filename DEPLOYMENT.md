# Deployment Guide

## Quick Start Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Circuit Discord Bot"
git branch -M main
git remote add origin https://github.com/austinway-boop/CircuitDiscord.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import `austinway-boop/CircuitDiscord` from GitHub
4. Configure your project:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. **Add Environment Variables:**
   - `DISCORD_PUBLIC_KEY`: `f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0`
   - `DISCORD_APPLICATION_ID`: `1444014145438486589`
   - `DISCORD_CLIENT_ID`: `1444014145438486589`
   - `DISCORD_CLIENT_SECRET`: `JgrqlkQuBlBNk1QcvthyIXDgCTeuOTea`

6. Click "Deploy"

### Step 3: Get Your Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589)
2. Click on "Bot" in the left sidebar
3. If you don't have a bot user, click "Add Bot"
4. Under "TOKEN" section, click "Reset Token" or "Copy" to get your bot token
5. **Save this token securely** - you'll need it for the next step

### Step 4: Configure Discord Interactions Endpoint

1. After Vercel deployment completes, copy your deployment URL (e.g., `https://circuit-discord.vercel.app`)
2. Go back to [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589)
3. Click "General Information" in the left sidebar
4. Find "Interactions Endpoint URL"
5. Enter: `https://YOUR-VERCEL-URL.vercel.app/api/interactions`
6. Click "Save Changes"
7. Discord will automatically verify the endpoint

### Step 5: Register Slash Commands

You can register commands in two ways:

#### Option A: Using Node.js locally

```bash
# Install dependencies
npm install

# Set your bot token
# Create a .env file with:
# DISCORD_BOT_TOKEN=your_bot_token_here

# Run the registration script
node scripts/register-commands.js
```

#### Option B: Using curl

```bash
curl -X PUT \
  https://discord.com/api/v10/applications/1444014145438486589/commands \
  -H "Authorization: Bot YOUR_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "ping",
      "description": "Check if the bot is responding",
      "type": 1
    },
    {
      "name": "hello",
      "description": "Get a friendly greeting from Circuit Bot",
      "type": 1
    },
    {
      "name": "info",
      "description": "Get information about Circuit Bot",
      "type": 1
    }
  ]'
```

### Step 6: Invite Bot to Your Server

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589)
2. Click "OAuth2" → "URL Generator"
3. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
4. Select bot permissions:
   - ✅ `Send Messages`
   - ✅ `Use Slash Commands`
5. Copy the generated URL and open it in your browser
6. Select your server and authorize

**Or use this direct link:**
```
https://discord.com/api/oauth2/authorize?client_id=1444014145438486589&permissions=2048&scope=bot%20applications.commands
```

### Step 7: Test Your Bot

In your Discord server, type:
- `/ping` - Should respond with "🏓 Pong!"
- `/hello` - Should greet you
- `/info` - Should show bot information

## Troubleshooting

### "Interaction failed" error
- Check Vercel function logs
- Verify environment variables are set correctly
- Ensure the interactions endpoint URL is correct

### Commands not appearing
- Wait 5-10 minutes for Discord to sync commands
- Try kicking and re-inviting the bot
- Re-run the register-commands script

### "Invalid request signature" error
- Double-check your `DISCORD_PUBLIC_KEY` in Vercel environment variables
- Ensure there are no extra spaces or characters

## Updating the Bot

When you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy!

## Monitoring

- **Vercel Logs**: [vercel.com/dashboard](https://vercel.com/dashboard) → Your Project → Functions
- **Discord Developer Portal**: Check your bot's status and interactions

---

🎉 **Congratulations!** Your Circuit Bot is now live on Vercel!

