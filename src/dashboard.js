import express from 'express';
import { 
  isBotEnabled, 
  setBotEnabled, 
  interactionLogs, 
  errorLogs, 
  clearLogs,
  getClient 
} from './index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'circuitbot123';

export function startDashboard() {
  const port = process.env.DASHBOARD_PORT || 3000;

  // Main dashboard page
  app.get('/', (req, res) => {
    const client = getClient();
    const isOnline = client && client.isReady();
    const enabled = isBotEnabled();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Circuit Bot Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      font-size: 3em;
      margin-bottom: 10px;
    }
    
    .status-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 20px;
    }
    
    .status-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    .status-online {
      background: #10b981;
    }
    
    .status-offline {
      background: #ef4444;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .stat-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-label {
      opacity: 0.9;
      font-size: 0.9em;
    }
    
    .controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary {
      background: #667eea;
      color: white;
    }
    
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    
    .btn-success {
      background: #10b981;
      color: white;
    }
    
    .btn-secondary {
      background: #6b7280;
      color: white;
    }
    
    .logs-section {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-height: 500px;
      overflow-y: auto;
    }
    
    .logs-section h2 {
      margin-bottom: 20px;
      color: #667eea;
      position: sticky;
      top: 0;
      background: white;
      padding: 10px 0;
      z-index: 10;
    }
    
    .log-entry {
      background: #f9fafb;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    .log-entry.error {
      border-left-color: #ef4444;
      background: #fef2f2;
    }
    
    .log-timestamp {
      color: #6b7280;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
    
    .password-input {
      padding: 10px;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      width: 200px;
    }
    
    .alert {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      font-weight: 500;
    }
    
    .alert-success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #10b981;
    }
    
    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #ef4444;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
    }
    
    .info-box {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ Circuit Bot Dashboard</h1>
      <p>Monitor and control your Discord bot</p>
    </div>
    
    <div class="status-card">
      <div class="status-indicator">
        <div class="status-dot ${isOnline ? 'status-online' : 'status-offline'}"></div>
        <span>Discord: ${isOnline ? 'CONNECTED ✅' : 'DISCONNECTED ❌'}</span>
      </div>
      
      <div class="status-indicator">
        <div class="status-dot ${enabled ? 'status-online' : 'status-offline'}"></div>
        <span>Bot: ${enabled ? 'ENABLED ✅' : 'DISABLED ⏸️'}</span>
      </div>
      
      <div class="info-box">
        <strong>✅ This bot is ALWAYS ONLINE!</strong> It maintains a persistent connection to Discord and will show as "Online" with a green status.
      </div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-value">${interactionLogs.length}</div>
          <div class="stat-label">Commands Used</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${errorLogs.length}</div>
          <div class="stat-label">Errors Logged</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${isOnline ? client.guilds.cache.size : 0}</div>
          <div class="stat-label">Servers</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${isOnline ? client.ws.ping : 0}ms</div>
          <div class="stat-label">Latency</div>
        </div>
      </div>
      
      <div id="alert" style="display: none;"></div>
      
      <div class="controls">
        <input 
          type="password" 
          id="password" 
          class="password-input" 
          placeholder="Admin Password"
          value=""
        >
        <button class="btn ${enabled ? 'btn-danger' : 'btn-success'}" onclick="toggleBot()">
          ${enabled ? '⏸️ Disable Bot' : '▶️ Enable Bot'}
        </button>
        <button class="btn btn-secondary" onclick="clearLogs()">
          🗑️ Clear Logs
        </button>
        <button class="btn btn-primary" onclick="location.reload()">
          🔄 Refresh
        </button>
      </div>
    </div>
    
    <div class="logs-section">
      <h2>📊 Recent Interactions (Last ${interactionLogs.length})</h2>
      ${interactionLogs.length > 0 ? 
        interactionLogs.slice(0, 50).map(log => `
          <div class="log-entry">
            <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
            <strong>${log.type}</strong> - Command: <code>/${log.command}</code> - User: ${log.user}
          </div>
        `).join('') :
        '<div class="empty-state">No interactions logged yet. Commands will appear here!</div>'
      }
    </div>
    
    <div class="logs-section">
      <h2>⚠️ Error Logs (Last ${errorLogs.length})</h2>
      ${errorLogs.length > 0 ?
        errorLogs.slice(0, 50).map(log => `
          <div class="log-entry error">
            <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
            <strong>Error:</strong> ${log.error}<br>
            <strong>Details:</strong> ${log.details}
          </div>
        `).join('') :
        '<div class="empty-state">✅ No errors! Everything is running smoothly.</div>'
      }
    </div>
  </div>
  
  <script>
    async function toggleBot() {
      const password = document.getElementById('password').value;
      const alertDiv = document.getElementById('alert');
      
      try {
        const response = await fetch('/api/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alertDiv.className = 'alert alert-success';
          alertDiv.textContent = data.message;
          alertDiv.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alertDiv.className = 'alert alert-error';
          alertDiv.textContent = data.error || 'Failed to toggle bot';
          alertDiv.style.display = 'block';
        }
      } catch (error) {
        alertDiv.className = 'alert alert-error';
        alertDiv.textContent = 'Error: ' + error.message;
        alertDiv.style.display = 'block';
      }
    }
    
    async function clearLogs() {
      const password = document.getElementById('password').value;
      const alertDiv = document.getElementById('alert');
      
      if (!confirm('Clear all logs?')) return;
      
      try {
        const response = await fetch('/api/clear-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alertDiv.className = 'alert alert-success';
          alertDiv.textContent = data.message;
          alertDiv.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alertDiv.className = 'alert alert-error';
          alertDiv.textContent = data.error || 'Failed to clear logs';
          alertDiv.style.display = 'block';
        }
      } catch (error) {
        alertDiv.className = 'alert alert-error';
        alertDiv.textContent = 'Error: ' + error.message;
        alertDiv.style.display = 'block';
      }
    }
    
    // Auto-refresh every 10 seconds
    setTimeout(() => location.reload(), 10000);
  </script>
</body>
</html>
    `;
    
    res.send(html);
  });

  // API endpoint to toggle bot
  app.post('/api/toggle', (req, res) => {
    const { password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const newState = !isBotEnabled();
    setBotEnabled(newState);
    
    res.json({ 
      success: true, 
      enabled: newState,
      message: `Bot is now ${newState ? 'ENABLED' : 'DISABLED'}`
    });
  });

  // API endpoint to clear logs
  app.post('/api/clear-logs', (req, res) => {
    const { password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    clearLogs();
    res.json({ success: true, message: 'Logs cleared successfully' });
  });

  app.listen(port, () => {
    console.log(`🌐 Dashboard running at http://localhost:${port}`);
  });
}

