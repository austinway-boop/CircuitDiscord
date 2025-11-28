# Troubleshooting Guide

## Bot Shows as Offline - IS THIS NORMAL?

**YES!** This is 100% expected and cannot be changed with serverless architecture.

### Why?

- **Vercel bots** use Discord's **Interaction API** (HTTP endpoints)
- They do NOT use the **Gateway API** (WebSocket connection)
- Discord only shows bots as "online" if they have an active WebSocket connection
- Serverless = no persistent connection = offline status

### ✅ The Bot WORKS Even While Offline!

The bot will respond to slash commands instantly even though it shows offline.

---

## Checklist: Is Your Bot Actually Working?

### Step 1: Verify Vercel Deployment ✅

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your Circuit Discord project
3. Check that:
   - Latest deployment shows "Ready" (green)
   - No error messages
   - Copy your deployment URL (e.g., `https://circuit-discord.vercel.app`)

### Step 2: Verify Discord Interactions Endpoint ✅

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/1444014145438486589/information)
2. Check "Interactions Endpoint URL" is set to: `https://YOUR-VERCEL-URL.vercel.app/api/interactions`
3. It should show a green checkmark if verified
4. If not verified, click "Save Changes" to re-verify

### Step 3: Verify Environment Variables ✅

In Vercel → Your Project → Settings → Environment Variables, you should have:

```
DISCORD_PUBLIC_KEY = f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0
DISCORD_APPLICATION_ID = 1444014145438486589
DISCORD_CLIENT_ID = 1444014145438486589
DISCORD_CLIENT_SECRET = JgrqlkQuBlBNk1QcvthyIXDgCTeuOTea
```

### Step 4: Register Commands ✅

Run this in your terminal:

```bash
node scripts/register-commands.js
```

You should see: `✅ Successfully registered commands`

### Step 5: Test in Discord ✅

1. In your Discord server, type `/`
2. You should see your bot's commands
3. Try `/ping` - should respond with "🏓 Pong!"

---

## Common Issues & Solutions

### "Application did not respond"

**Cause:** Interactions endpoint not set or wrong URL

**Fix:**
1. Go to Discord Developer Portal → Your App → General Information
2. Set Interactions Endpoint URL to your Vercel URL + `/api/interactions`
3. Example: `https://circuit-discord-abc123.vercel.app/api/interactions`

### Commands Don't Appear in Discord

**Cause:** Commands not registered or need time to sync

**Fix:**
1. Run `node scripts/register-commands.js`
2. Wait 5-10 minutes for Discord to sync
3. Try kicking and re-inviting the bot
4. Restart Discord client

### "Invalid Request Signature" Error in Vercel Logs

**Cause:** Wrong PUBLIC_KEY in environment variables

**Fix:**
1. Verify `DISCORD_PUBLIC_KEY` in Vercel is exactly: `f37ed48978e1f892ae4c5eab01380df0594b5ef87a06b7700ef11c147e1c2ec0`
2. No extra spaces or characters
3. Redeploy after fixing

### Bot Doesn't Respond After Changes

**Cause:** Vercel needs to redeploy

**Fix:**
1. Push to GitHub: `git push`
2. Wait ~1 minute for Vercel to deploy
3. Check deployment status in Vercel dashboard

---

## Do You REALLY Need the Bot to Show "Online"?

If you absolutely need the bot to show as "Online" with a green status, you'll need to switch to a **traditional hosting solution** with a WebSocket bot:

### Alternative: Traditional Bot (Shows Online)

**Requirements:**
- Node.js server running 24/7
- Hosting: Railway, Heroku, DigitalOcean, or VPS
- Use `discord.js` library
- Maintain WebSocket connection

**Pros:**
- Shows as "Online" in Discord
- Can listen to message events (not just commands)
- More traditional bot features

**Cons:**
- Costs money (unless free tier)
- Need to maintain server
- More complex setup
- Can go offline if server crashes

### Current Setup (Serverless - Shows Offline)

**Pros:**
- FREE on Vercel
- 100% uptime
- Auto-scales
- Zero maintenance
- Instant responses

**Cons:**
- Shows as "Offline" (cosmetic only)
- Slash commands only (no message events)

---

## Still Having Issues?

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on latest deployment → Functions tab
   - Look for errors

2. **Test the Endpoint Directly:**
   ```bash
   curl https://YOUR-VERCEL-URL.vercel.app/api/interactions
   ```
   Should return: `{"error":"Method not allowed"}` (this is correct!)

3. **Verify Bot Token:**
   - Make sure you got your bot token from Discord Developer Portal
   - Token should start with something like `MTQ0NDE...`

---

## Summary

✅ **Bot showing offline = Normal for Vercel**  
✅ **Bot still works perfectly while offline**  
✅ **Commands respond instantly**  
✅ **This is the correct architecture for serverless**

If you need help with a specific error, check the Vercel logs and let me know what you see!

