const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const express = require('express');
require('dotenv').config();

// Bot configuration
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// State management
let botEnabled = true;
const interactionLogs = [];
const errorLogs = [];
const MAX_LOGS = 100;

function logInteraction(command, user) {
  interactionLogs.unshift({
    timestamp: new Date().toISOString(),
    command,
    user
  });
  if (interactionLogs.length > MAX_LOGS) interactionLogs.pop();
}

function logError(error, details) {
  errorLogs.unshift({
    timestamp: new Date().toISOString(),
    error: error.toString(),
    details: details || 'No details'
  });
  if (errorLogs.length > MAX_LOGS) errorLogs.pop();
}

// Discord bot ready event
client.once('ready', () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     ⚡ CIRCUIT BOT IS ONLINE! ⚡      ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`\n🤖 Bot: ${client.user.tag}`);
  console.log(`📊 Servers: ${client.guilds.cache.size}`);
  console.log(`👥 Users: ${client.users.cache.size}`);
  console.log(`🌐 Dashboard: http://localhost:${process.env.PORT || 3000}\n`);
  
  client.user.setPresence({
    activities: [{ name: '/help | Circuit Bot', type: 0 }],
    status: 'online'
  });
});

// Handle slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user } = interaction;
  logInteraction(commandName, user.username);

  if (!botEnabled) {
    await interaction.reply({
      content: '⏸️ Bot is currently disabled by admin.',
      ephemeral: true
    });
    return;
  }

  try {
    switch (commandName) {
      case 'ping':
        await interaction.reply(`🏓 Pong! Latency: ${client.ws.ping}ms`);
        break;

      case 'hello':
        await interaction.reply(`👋 Hello ${interaction.user}! Circuit Bot is online and ready!`);
        break;

      case 'info':
        const embed = new EmbedBuilder()
          .setTitle('⚡ Circuit Bot')
          .setDescription('Always-online Discord bot with admin dashboard!')
          .setColor(0x00D9FF)
          .addFields(
            { name: '🤖 Status', value: '✅ ONLINE', inline: true },
            { name: '⚡ Latency', value: `${client.ws.ping}ms`, inline: true },
            { name: '🌐 Servers', value: `${client.guilds.cache.size}`, inline: true }
          )
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
        break;

      case 'help':
        const helpEmbed = new EmbedBuilder()
          .setTitle('📚 Commands')
          .setDescription('/ping - Check latency\n/hello - Get greeting\n/info - Bot info\n/help - This message')
          .setColor(0x5865F2);
        await interaction.reply({ embeds: [helpEmbed] });
        break;

      default:
        await interaction.reply({ content: '❌ Unknown command', ephemeral: true });
    }
  } catch (error) {
    console.error('Command error:', error);
    logError(error.message, `Command: ${commandName}`);
  }
});

// Express dashboard
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'circuitbot123';

app.get('/', (req, res) => {
  const isOnline = client.isReady();
  
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Circuit Bot Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      color: white;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 2.5em; margin-bottom: 10px; }
    .card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .status {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    .online { background: #10b981; }
    .offline { background: #ef4444; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .stat {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    .stat-value { font-size: 2em; font-weight: bold; }
    .stat-label { font-size: 0.9em; opacity: 0.9; }
    .controls {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    input, button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
    }
    input {
      border: 2px solid #e5e7eb;
      flex: 1;
      min-width: 200px;
    }
    button {
      background: #667eea;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .btn-danger { background: #ef4444; }
    .btn-success { background: #10b981; }
    .logs {
      max-height: 400px;
      overflow-y: auto;
      background: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    .log-entry {
      background: white;
      padding: 10px;
      margin-bottom: 10px;
      border-left: 4px solid #667eea;
      border-radius: 4px;
    }
    .log-entry.error { border-left-color: #ef4444; background: #fef2f2; }
    .empty { text-align: center; padding: 40px; color: #9ca3af; }
    .alert {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      display: none;
    }
    .alert-success { background: #d1fae5; color: #065f46; }
    .alert-error { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ Circuit Bot Dashboard</h1>
      <p>Monitor and control your Discord bot</p>
    </div>
    
    <div class="card">
      <div class="status">
        <div class="dot ${isOnline ? 'online' : 'offline'}"></div>
        <span>Bot: ${isOnline ? 'ONLINE ✅' : 'OFFLINE ❌'}</span>
      </div>
      
      <div class="status">
        <div class="dot ${botEnabled ? 'online' : 'offline'}"></div>
        <span>Commands: ${botEnabled ? 'ENABLED ✅' : 'DISABLED ⏸️'}</span>
      </div>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${interactionLogs.length}</div>
          <div class="stat-label">Commands Used</div>
        </div>
        <div class="stat">
          <div class="stat-value">${errorLogs.length}</div>
          <div class="stat-label">Errors</div>
        </div>
        <div class="stat">
          <div class="stat-value">${isOnline ? client.guilds.cache.size : 0}</div>
          <div class="stat-label">Servers</div>
        </div>
        <div class="stat">
          <div class="stat-value">${isOnline ? client.ws.ping : 0}ms</div>
          <div class="stat-label">Latency</div>
        </div>
      </div>
      
      <div id="alert" class="alert"></div>
      
      <div class="controls">
        <input type="password" id="password" placeholder="Admin Password" value="">
        <button class="${botEnabled ? 'btn-danger' : 'btn-success'}" onclick="toggleBot()">
          ${botEnabled ? '⏸️ Disable' : '▶️ Enable'}
        </button>
        <button onclick="clearLogs()">🗑️ Clear Logs</button>
        <button onclick="location.reload()">🔄 Refresh</button>
      </div>
    </div>
    
    <div class="card">
      <h2>📊 Recent Commands</h2>
      <div class="logs">
        ${interactionLogs.length > 0 ? 
          interactionLogs.slice(0, 20).map(log => `
            <div class="log-entry">
              ${new Date(log.timestamp).toLocaleString()} - /${log.command} by ${log.user}
            </div>
          `).join('') :
          '<div class="empty">No commands yet</div>'
        }
      </div>
    </div>
    
    <div class="card">
      <h2>⚠️ Errors</h2>
      <div class="logs">
        ${errorLogs.length > 0 ?
          errorLogs.slice(0, 20).map(log => `
            <div class="log-entry error">
              ${new Date(log.timestamp).toLocaleString()} - ${log.error}
            </div>
          `).join('') :
          '<div class="empty">✅ No errors!</div>'
        }
      </div>
    </div>
  </div>
  
  <script>
    async function toggleBot() {
      const password = document.getElementById('password').value;
      const alert = document.getElementById('alert');
      
      try {
        const res = await fetch('/api/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          alert.className = 'alert alert-success';
          alert.textContent = data.message;
          alert.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alert.className = 'alert alert-error';
          alert.textContent = data.error;
          alert.style.display = 'block';
        }
      } catch (error) {
        alert.className = 'alert alert-error';
        alert.textContent = 'Error: ' + error.message;
        alert.style.display = 'block';
      }
    }
    
    async function clearLogs() {
      const password = document.getElementById('password').value;
      const alert = document.getElementById('alert');
      
      if (!confirm('Clear all logs?')) return;
      
      try {
        const res = await fetch('/api/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          alert.className = 'alert alert-success';
          alert.textContent = data.message;
          alert.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alert.className = 'alert alert-error';
          alert.textContent = data.error;
          alert.style.display = 'block';
        }
      } catch (error) {
        alert.className = 'alert alert-error';
        alert.textContent = 'Error: ' + error.message;
        alert.style.display = 'block';
      }
    }
    
    setTimeout(() => location.reload(), 30000);
  </script>
</body>
</html>
  `);
});

app.post('/api/toggle', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  botEnabled = !botEnabled;
  res.json({ success: true, enabled: botEnabled, message: `Bot ${botEnabled ? 'enabled' : 'disabled'}` });
});

app.post('/api/clear', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  interactionLogs.length = 0;
  errorLogs.length = 0;
  res.json({ success: true, message: 'Logs cleared' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Dashboard running on port ${PORT}`);
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN).catch(error => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});

