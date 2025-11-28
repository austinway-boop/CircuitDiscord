# 🎛️ Circuit Bot Dashboard

Your bot now has a **web dashboard** where you can monitor and control it!

## 🌐 Access Your Dashboard

After deploying to Vercel, go to your main URL:

```
https://YOUR-VERCEL-URL.vercel.app
```

For example: `https://circuit-discord.vercel.app`

## ✨ Dashboard Features

### 📊 Real-Time Monitoring
- **Bot Status** - See if the bot is enabled or disabled
- **Interaction Counter** - Track how many commands have been used
- **Error Counter** - Monitor any errors that occur
- **Live Logs** - View recent interactions and errors

### 🎮 Controls
- **Enable/Disable Bot** - Turn the bot on or off with one click
- **Clear Logs** - Reset all logged data
- **Auto-Refresh** - Dashboard updates every 30 seconds
- **Manual Refresh** - Force refresh anytime

### 🔐 Security
- **Password Protected** - All actions require an admin password
- **Default Password**: `circuitbot123` (change this!)

## 🔧 Setup Instructions

### 1. Set Admin Password (Optional but Recommended)

In Vercel, add a new environment variable:

```
ADMIN_PASSWORD = your-secure-password-here
```

If you don't set this, the default password is `circuitbot123`

### 2. Access the Dashboard

1. Deploy your bot to Vercel
2. Go to your Vercel URL (the root, not `/api/interactions`)
3. You'll see the dashboard!

### 3. Use the Controls

1. Enter your admin password in the input field
2. Click "Disable Bot" to pause the bot (users will get a message saying bot is disabled)
3. Click "Enable Bot" to re-enable it
4. Click "Clear Logs" to reset all logs

## 📊 What You Can See

### Interaction Logs
Shows recent commands used:
- Timestamp of when command was used
- Command name (ping, hello, info, etc.)
- Username of who used it
- Success/failure status

### Error Logs
Shows any errors that occur:
- Timestamp of error
- Error message
- Additional details about what went wrong

### Stats
- Total interactions count
- Total errors count
- Current bot state (ACTIVE/PAUSED)
- Platform (Vercel)

## 🎯 Common Use Cases

### Maintenance Mode
Disable the bot during maintenance:
1. Go to dashboard
2. Enter password
3. Click "Disable Bot"
4. Bot will respond to all commands with "Bot is currently disabled"
5. Re-enable when done

### Debugging
Check what's happening:
1. Open dashboard
2. Use a command in Discord
3. See it appear in "Recent Interactions"
4. Check "Error Logs" if something went wrong

### Monitoring
Keep dashboard open to monitor:
- How often bot is being used
- Any errors occurring
- General health of the bot

## 🔒 Security Notes

⚠️ **IMPORTANT:**
- Change the default password immediately!
- Don't share your Vercel URL publicly
- Add `ADMIN_PASSWORD` to Vercel environment variables
- Dashboard URL is the same as your bot's root URL

## 💡 Pro Tips

1. **Bookmark the dashboard** - Add it to your browser bookmarks for quick access
2. **Mobile friendly** - Works great on phones/tablets
3. **Auto-refresh** - Page auto-refreshes every 30 seconds to show latest data
4. **Ephemeral messages** - When bot is disabled, users get a private message only they can see

## 🐛 Troubleshooting

### Can't access dashboard
- Make sure you're going to the root URL (not `/api/interactions`)
- Check that Vercel deployment succeeded
- Try clearing browser cache

### Password not working
- Check that `ADMIN_PASSWORD` is set in Vercel
- If not set, use default: `circuitbot123`
- Make sure there are no spaces before/after password

### Logs not showing
- Logs are stored in memory (resets on each deployment)
- Try using a command in Discord first
- Refresh the dashboard

### Bot still responds when disabled
- Make sure you clicked "Disable Bot" and saw success message
- Refresh the page to verify status
- Note: Pending requests might still complete

## 📈 Future Features (Coming Soon)

- Persistent log storage
- Command usage statistics
- User analytics
- Custom command management via dashboard
- Webhook notifications
- More detailed error tracking

---

**Your bot now has a professional dashboard!** 🎉

Access it at: `https://YOUR-VERCEL-URL.vercel.app`

